# 好檢 Health Finder

使用 Vue 3 串接勞動部開放資料，查詢全台勞工體格及健康檢查認可醫療機構的 side project。

## 技術棧

- Vue 3 + Composition API
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn-vue 元件結構
- Pinia
- Vue Router
- Lucide Icons

## 開始使用

```bash
npm install
npm run dev
```

生產環境建置：

```bash
npm run build
npm run preview
```

正式建置預設讀取 `public/data/institutions.json` 的靜態資料；首次部署與更新資料請使用下方的 `npm run build:pages`。

## 專案架構

```text
src/
├── components/
│   ├── institutions/  # 搜尋與院所卡片
│   ├── shared/        # Header / Footer
│   └── ui/            # shadcn-vue 基礎元件
├── composables/           # 可重複使用的篩選邏輯
├── layouts/               # 頁面共用佈局
├── services/              # API 請求與資料轉換
├── stores/                # Pinia 全域狀態
├── types/                 # TypeScript 型別
└── views/                 # 路由頁面
```

## API 資料來源

- 資料集：勞工體格及健康檢查認可醫療機構
- 提供機關：勞動部職業安全衛生署
- API：`https://apiservice.mol.gov.tw/OdService/rest/datastore/A17000000J-020057-Nvt`

API 的中文原始欄位只在 `src/services/institutionService.ts` 處理，Vue 元件只使用轉換後的 `MedicalInstitution` 型別。

### CORS 與部署

官方 API 未開放瀏覽器跨網域請求，本專案已在 `vite.config.ts` 設定 `/mol-api` 開發與預覽代理。

GitHub Pages 正式環境預設讀取與網站一起發布的 JSON，瀏覽器不會呼叫 `/mol-api`。本機 `npm run dev` 仍使用官方 API 代理。

### 部署到 GitHub Pages

```bash
npm run build:pages
```

此指令下載並驗證官方資料（沿用目前查詢上限 1000 筆），儲存至 `public/data/institutions.json`，執行 TypeScript 檢查與 Vite 建置，再以建置結果更新 `docs/` 並加入 `.nojekyll`。下載失敗、格式錯誤或資料為空時會停止，不覆蓋既有資料與發布檔案；建置失敗時不更新 `docs/`。

正式建置與預覽使用 `/health-check-helper-tw/` 路徑，本機開發使用 `/`。可執行 `npm run preview` 並開啟 `http://localhost:4173/health-check-helper-tw/` 查看結果。

提交設定、`public/data/institutions.json` 及 `docs/` 並推送到 `main`。`dist/` 維持忽略，不需提交。GitHub 儲存庫的 **Settings → Pages → Build and deployment** 設定為：

- Source：**Deploy from a branch**
- Branch：**main**
- Folder：**/docs**

儲存後等待 Pages 部署完成，預覽網址為：https://syong668.github.io/health-check-helper-tw/

每次要更新網站或院所資料，重新執行 `npm run build:pages`，提交變更並推送。網站使用下載當下的資料快照，不會自行同步官方資料。`docs/` 專供產生發布檔案，請勿手動編輯，重新建置會完整替換。

### 日後切換即時 API 代理

部署另外的代理服務後，可在建置時透過環境變數覆蓋資料網址：

```bash
VITE_INSTITUTION_API_URL=https://your-proxy.example.com/institutions npm run build
```

跨網域代理需要允許網站來源的 CORS；代理回應必須維持官方 API 的 JSON 格式。更新建置結果後重新發布。
