import type {
  AccreditationItem,
  MedicalInstitution,
  OfficialInstitutionRecord,
  OfficialInstitutionResponse,
} from '@/types/institution'

export const INSTITUTION_API_URL =
  'https://apiservice.mol.gov.tw/OdService/rest/datastore/A17000000J-020057-Nvt'

const REQUEST_LIMIT = 1000
const API_REQUEST_URL =
  import.meta.env.VITE_INSTITUTION_API_URL ??
  '/mol-api/rest/datastore/A17000000J-020057-Nvt'

function formatRocDate(date: string) {
  if (!/^\d{7}$/.test(date)) return date

  const year = Number(date.slice(0, 3)) + 1911
  const month = date.slice(3, 5)
  const day = date.slice(5, 7)

  return `${year}/${month}/${day}`
}

function getAccreditations(accreditation: string): AccreditationItem[] {
  return accreditation
    .split('、')
    .map((item) => {
      const normalizedItem = item.trim()
      const matched = normalizedItem.match(/^(.+?)\((\d{7})\s*~\s*(\d{7})\)$/)

      if (!matched) {
        return {
          category: normalizedItem,
          validFrom: '',
          validUntil: '',
        }
      }

      return {
        category: matched[1]?.trim() ?? normalizedItem,
        validFrom: formatRocDate(matched[2] ?? ''),
        validUntil: formatRocDate(matched[3] ?? ''),
      }
    })
    .filter((item) => item.category)
}

function normalizeRecord(record: OfficialInstitutionRecord): MedicalInstitution {
  const accreditation = record['認可類別及有效期限']
  const accreditations = getAccreditations(accreditation)
  const city = record['縣市別'] ?? ''
  const address = record['醫療機構地址'] ?? ''
  // 僅解析地址開頭的主要所在地，不拆分同一院所的其他地址。
  const normalizedCity = city.replace(/\s/g, '').replaceAll('台', '臺')
  const normalizedAddress = address.replace(/\s/g, '').replaceAll('台', '臺')
  const district = normalizedCity && normalizedAddress.startsWith(normalizedCity)
    ? normalizedAddress.slice(normalizedCity.length).match(/^([\p{Script=Han}]+?[區鄉鎮]|[\p{Script=Han}]+?市)/u)?.[1] ?? ''
    : ''

  return {
    id: `${record['醫療機構代碼']}-${record['編號']}`,
    code: record['醫療機構代碼'],
    city,
    district,
    name: record['醫療機構名稱'],
    address,
    contactPerson: record['勞工健檢聯絡人'],
    phone: record['連絡電話'],
    extension: record['分機號碼'],
    accreditation,
    accreditations,
    categories: [...new Set(accreditations.map((item) => item.category))],
    updatedAt: record['資料更新日期'],
    note: record['備註'],
  }
}

export async function fetchMedicalInstitutions(signal?: AbortSignal) {
  const url = new URL(API_REQUEST_URL, window.location.origin)
  url.searchParams.set('limit', String(REQUEST_LIMIT))

  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`API 回應錯誤（${response.status}）`)
  }

  const data = (await response.json()) as OfficialInstitutionResponse

  console.log('API完整回傳資料：', data)
  console.log('醫療機構列表：', data.result?.records)
  console.table(data.result?.records)


  if (!data.success || !Array.isArray(data.result?.records)) {
    throw new Error('官方資料格式與預期不符')
  }

  return {
    institutions: data.result.records.map(normalizeRecord),
    updateTime: data.updateTime,
  }
}
