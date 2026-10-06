import { spawnSync } from 'node:child_process'
import { cp, mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const dataDirectory = path.join(root, 'public/data')
const snapshot = path.join(dataDirectory, 'institutions.json')
const temporarySnapshot = `${snapshot}.tmp`
const apiUrl = 'https://apiservice.mol.gov.tw/OdService/rest/datastore/A17000000J-020057-Nvt?limit=1000'
let stagingDirectory

try {
  console.log('下載官方院所資料…')
  const response = await fetch(apiUrl, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) throw new Error(`官方 API 回應錯誤（${response.status}）`)

  const data = await response.json()
  if (!data.success || !Array.isArray(data.result?.records) || !data.result.records.length) {
    throw new Error('官方資料格式與預期不符，或院所列表為空；保留既有發布檔案。')
  }

  await mkdir(dataDirectory, { recursive: true })
  await writeFile(temporarySnapshot, `${JSON.stringify(data, null, 2)}\n`)
  await rename(temporarySnapshot, snapshot)
  console.log(`已下載 ${data.result.records.length} 筆院所資料。`)

  const build = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  if (build.error) throw build.error
  if (build.status !== 0) throw new Error('網站建置失敗；保留既有 docs。')

  stagingDirectory = await mkdtemp(path.join(root, '.pages-build-'))
  await cp(path.join(root, 'dist'), stagingDirectory, { recursive: true })
  await writeFile(path.join(stagingDirectory, '.nojekyll'), '')
  await rm(path.join(root, 'docs'), { recursive: true, force: true })
  await rename(stagingDirectory, path.join(root, 'docs'))
  stagingDirectory = undefined
  console.log('GitHub Pages 檔案已準備於 docs/，可提交並推送至 main。')
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await rm(temporarySnapshot, { force: true })
  if (stagingDirectory) await rm(stagingDirectory, { recursive: true, force: true })
}
