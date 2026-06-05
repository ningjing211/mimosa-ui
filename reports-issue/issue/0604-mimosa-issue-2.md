# 05 Report — Mobile Ionic 與 Mimosa 樣式未整合（訪客首頁版面崩壞）

**建立日期：** 2026-06-05  
**回報 URL 範例：** `http://localhost:58486/`（`npm run start:mobile`）  
**關聯報告：** `04-report-guest-home-mimosa-visual-hierarchy-contrast.md`（深底文案 token；Web 已對齊 0.2.8）

---

## 1. 摘要

| 項目 | 說明 |
|------|------|
| **現象** | Mobile 訪客首頁 Mimosa 按鈕有套用，但版面全寬、header CTA 貼齊視窗角、標題色與 hero 漸層不協調，整體像「元件與頁面脫節」。 |
| **主因 1** | `apps/mobile/.../guest-home.page.css` **缺少** Web 同款的 `.guest-home` 容器（`max-width`、`padding`、`min-height`），HTML 已有 class 但樣式未同步。 |
| **主因 2** | `apps/mobile/src/styles.css` 只將 `ion-content` 設為透明，**未**把 `ion-app`／Ionic typography 變數對齊 Mimosa `--psy-*`，Ionic 預設字色／連結色與深底 hero 衝突。 |
| **主因 3** | Mobile 全域樣式載入順序為 Ionic core → Mimosa（`app.css`），缺少 **Ionic bridge** 層，未明確禁止 Ionic 覆寫 `psy-btn`／標題 token。 |
| **非主因** | Mimosa 未安裝或 Tailwind 未編譯（按鈕仍為螢光黃／綠，代表 DS 有載入）。 |

---

## 2. 與 Web 差異對照

| 項目 | Web | Mobile（修正前） |
|------|-----|------------------|
| 頁面根容器 `.guest-home` | 有 `max-width: 32rem`、置中、padding | **無**（僅子元素規則） |
| 外層捲動 | `body` | `ion-content` + `ion-app` |
| Ionic CSS | 無 | `core/normalize/structure/typography` |
| Mimosa on-dark class | HTML 已用 `psy-lead-on-dark` 等 | 同左，但容器版面未收斂 |

---

## 3. 修正策略（消費端）

1. 新增 `shared/frontend/styles/guest-home-layout.css`，Web／Mobile 共用版面規則。  
2. 新增 `shared/frontend/styles/mobile-ionic-bridge.css`，對齊 `ion-app`、`ion-content`、標題字色、連結色與 tab bar。  
3. `apps/mobile/src/styles.css` 於 Mimosa 之後載入 bridge。  
4. 開發規範寫入 `docs/dev/mobile-mimosa-style-guide.md`。

**SDD 對照：** `06-ui-ux.md` § Design System — Mobile smoke「Mimosa 可編譯並套用」「手機優先 spacing 合理」。

---

## 4. 驗收（目視）

- [ ] 訪客首頁內容寬度約 32rem 置中，header 與 CTA 不貼死視窗邊緣  
- [ ] `Rave Connect` 標題使用 `--psy-text-primary`（與 Web 一致）  
- [ ] 深底說明、`1 / n`、建立活動可讀（沿用 0.2.8 on-dark class）  
- [ ] `psy-btn` 與 `psy-card` 視覺屬同一系統  
- [ ] `npm run check` 通過

---

**維護：** Rave Connect 前端  
**實作 task：** `tasks/06-UI-002-10-mobile-mimosa-ionic-styles.md`
