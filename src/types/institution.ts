export interface OfficialInstitutionRecord {
  '資料更新日期': string
  '編號': string
  '縣市別': string
  '醫療機構代碼': string
  '醫療機構名稱': string
  '醫療機構地址': string
  '勞工健檢聯絡人': string
  '連絡電話': string
  '分機號碼': string
  '認可類別及有效期限': string
  '備註': string
}

export interface OfficialInstitutionResponse {
  success: boolean
  updateTime: string
  result?: {
    resource_id: string
    records: OfficialInstitutionRecord[]
  }
}

export interface AccreditationItem {
  category: string
  validFrom: string
  validUntil: string
}

export interface MedicalInstitution {
  id: string
  code: string
  city: string
  name: string
  address: string
  contactPerson: string
  phone: string
  extension: string
  accreditation: string
  accreditations: AccreditationItem[]
  categories: string[]
  updatedAt: string
  note: string
}

export interface InstitutionFilters {
  keyword: string
  city: string
}
