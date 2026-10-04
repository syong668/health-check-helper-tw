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

部署到靜態網站時，需在部署平台建立同網域的 serverless proxy，並將其網址設為：

```bash
VITE_INSTITUTION_API_URL=/your-api-proxy
```
