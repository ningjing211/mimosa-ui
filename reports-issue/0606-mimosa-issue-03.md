# 12 Report — Workbench Admin 套用消費者 Neo-Brutalism 導致 B2B 後台辨識度異常

**建立日期：** 2026-06-06  
**回報對象：** `mimosa-design-system` 維護者（§4～§7）；Rave Connect Web 前端（§3、§8）  
**關聯報告：** [`11-report-admin-panel-mimosa-visual-hierarchy-gaps.md`](./11-report-admin-panel-mimosa-visual-hierarchy-gaps.md)（0.3.5 前結構缺口）、`06-UI-002-23`（本專案已遷移 workbench）  
**實測環境：** `mimosa-design-system@0.3.5`；`npm run start:web` → `http://localhost:4200/admin/reports`；Chrome（使用者截圖 2026-06-06）

---

## 1. 摘要（給 Mimosa 作者）

| 項目 | 說明 |
|------|------|
| **使用者回報** | Admin「視覺系統太怪、辨識度怪、對比太誇張」；不像任何常見後台（Stripe／Linear／Retool／Ant Design Pro）。 |
| **實測結論** | 0.3.5 的 Workbench **只解決了 layout／surface 分區**，但 **視覺語言仍是 Acid Neo-Brutalism 消費者系統** 直接疊上 B2B 元件。 |
| **核心矛盾** | README 宣稱 Consumer mode vs Ops mode 分離，但 Ops 仍共用：`3px` 黑框、`8px` 硬陰影、萊姆綠 primary、淡紫 gradient card、表單 `4px` offset shadow。 |
| **建議 Mimosa** | 新增 **Ops Calm / Workbench Quiet** 子主題（或 `data-psy-theme="ops"`），與消費者 primitive 脫鉤；提供平實 admin 範例與視覺回歸基準。 |
| **建議 Rave（過渡）** | 暫停將 filter／table／primary CTA 全量改用消費者 primitive；僅保留 shell 結構或加 admin scope override（見 §8）。 |

---

## 2. 實測方法（本專案自行驗證）

### 2.1 重現步驟

```text
1. package.json：mimosa-design-system@0.3.5
2. npm install && npm run start:web
3. /admin/login → admin@rave.test / Password1
4. 開啟 /admin/reports
5. 對照使用者截圖 + DevTools Computed Styles
```

### 2.2 實作對齊 README 範例

本專案已依 0.3.5 README「Workbench / Admin」章節實作（非消費端自創亂改）：

| 區塊 | 使用 class |
|------|------------|
| 外殼 | `psy-page-workbench` → `psy-workbench-shell` |
| 側欄 | `psy-workbench-sidebar` + `psy-workbench-nav__link` |
| 登出 | `psy-btn-ghost-on-workbench` |
| 篩選 | `psy-filter-bar` + `form-select form-select--on-light` |
| 套用 | `psy-btn-primary` |
| 表格 | `table-card` + `psy-data-panel` + `data-table` |
| 狀態 | `psy-badge-status--warning/info/success` |

**因此：怪異感來自設計系統本身，不是 Rave 未跟文件。**

### 2.3 截圖觀察（與使用者描述一致）

| 元素 | 視覺 | 常見 Admin 預期 |
|------|------|-----------------|
| 整體 | 深紫側欄 + 淡紫卡片 + 螢光綠按鈕 + 粗黑框 | 中性灰／白底、單一品牌色點綴 |
| 篩選下拉 | 高飽和紫底 + **4px 黑色 offset shadow** | 白／灰底、1px 邊框、無投影或極淡 |
| 「套用篩選」 | **萊姆綠 `#ccff00` 填色** + 黑框硬陰影 | 藍／灰 primary 或 outline secondary |
| 表格容器 | `table-card` 雙層 **8px 硬陰影** + 3px 黑框 | 1px 分隔、扁平或极浅 elevation |
| 狀態 badge | 黃／粉／綠膠囊 + 色點 | 低飽和 pill 或灰底 + 小色點 |
| 側欄 active | 萊姆綠左條 + 深灰底 | 細藍條或淡灰底，低調 |

**Squint test：** 最搶眼的是萊姆綠按鈕與紫色表單，不是表格資料——違反 B2B「資料優先」掃讀。

---

## 3. 根因分析（CSS／Token 證據）

### 3.1 設計系統自我定位與 Admin 需求衝突

`dist/tokens.css` 開頭：

```text
/* v16-psychedelic Theme Tokens（Acid / Neo-Brutalism Psychedelic） */
```

同一檔案內 Workbench 註解寫「neutral utilitarian」，但 **未獨立一組 Ops 視覺 token**，僅新增 layout class。

### 3.2 全站共用的「重口味」結構 token

| Token | 值 | 影響 admin |
|-------|-----|------------|
| `--psy-border-width-block` | `3px` | filter bar、table-card、按鈕外框極粗 |
| `--psy-shadow-hard` | `8px 8px 0 #16001e` | 每個 panel 像海報貼紙 |
| `--psy-action-primary-bg` | `--psy-color-secondary-lime` (`#ccff00`) | 篩選變成派對 CTA |
| `--psy-surface-card` | 白 88% + **淡紫** panel-muted | 整片薰衣草紫底 |
| `--psy-gradient-card-surface` | 紫／洋紅 wash gradient | 卡片帶夜店感 |

### 3.3 表單控件仍帶消費者 offset shadow

`dist/tailwind/product.css`：

```css
.form-select {
  border: var(--psy-border-width-block) solid ...;
  box-shadow: 4px 4px 0 var(--psy-color-base);  /* 每個 select 一塊黑影 */
}
.form-select--on-light {
  background: var(--psy-surface-card);  /* 淡紫底，非中性白 */
}
```

Workbench README 建議 `form-select--on-light`，但 **無法移除 4px shadow**，在篩選列上特別突兀。

### 3.4 Filter bar 與 table 雙重「 brutal 疊加」

`workbench.css`：

```css
.psy-filter-bar {
  background: var(--psy-surface-workbench-panel); /* = surface-card 淡紫 */
  border: 3px solid var(--psy-border-strong);
  box-shadow: var(--psy-shadow-hard);
}
```

`tables.css` / `table-card` 同樣 `3px` + `8px shadow`。

結果：一頁上 **多個獨立 brutal 區塊** 互相競爭，不像一個沉穩 workspace。

### 3.5 Workbench 外殼仍係深紫宇宙

```css
--psy-surface-workbench: color-mix(void 94%, white);
--psy-surface-workbench-sidebar: color-mix(void 98%, white 2%);
--psy-text-workbench-primary: var(--psy-text-primary); /* 淺紫白字 */
```

側欄 active 邊框：`border-left-color: var(--psy-color-secondary-lime)`。

這是 **Rave 品牌夜店殼**，不是 **Notion／Linear 灰殼**。

### 3.6 0.3.5 解了什麼、沒解什麼

| 11-report 訴求 | 0.3.5 狀態 |
|----------------|------------|
| 不要 hero 漸層 | ✅ `psy-page-workbench` |
| status badge | ✅ `psy-badge-status--*` |
| data table 容器 | ✅ `table-card` / `data-table` |
| 側欄登出語意 | ✅ `psy-btn-ghost-on-workbench` |
| **B2B 中性視覺、低對比、專業辨識度** | ❌ 仍為 Acid Neo-Brutalism |
| **表單／按鈕 calm variant** | ❌ 無 |
| **Ops 專用 surface（白／灰）** | ❌ 仍用淡紫 card |

---

## 4. 與業界 Admin 對照（為何「不像 admin」）

| 產品／系統 | 主特徵 | Mimosa Workbench 0.3.5 |
|------------|--------|-------------------------|
| **Shopify Polaris** | 灰白底、細線、低飽和 badge、藍色 link | 粗黑框 + 硬陰影 + 萊姆 CTA |
| **Ant Design Pro** | 白卡、淺灰 table header、`@primary-color` 單一藍 | 淡紫卡 + 螢光綠 primary |
| **shadcn dashboard** | `bg-background` 中性、`border` 1px、`shadow-sm` | `shadow-hard` 8px 無 blur |
| **Linear** | 極低對比、資料優先、accent 極少 | 每個控件都是 accent |
| **Retool / Metabase** | 工具感、扁平、密度高 | 海報式區塊分割 |

**結論：** 0.3.5 Workbench 是「**用夜店 UI kit 拼後台 wireframe**」，結構對、語彙錯。

---

## 5. 建議 Mimosa 採取的方案

### 5.1 P0 — 建立 **Ops Calm** 主題（與 Consumer 平級，非變體硬套）

建議新增 `dist/tailwind/workbench-calm.css` 或 `[data-psy-theme="ops"]`：

| Token／行為 | Consumer（現狀） | Ops Calm（建議） |
|-------------|------------------|------------------|
| Panel 背景 | 淡紫 gradient card | `#ffffff` 或 `#f9fafb` |
| 邊框 | `3px solid #16001e` | `1px solid #e5e7eb` |
| Shadow | `8px 8px 0 #16001e` | `none` 或 `0 1px 2px rgba(0,0,0,.06)` |
| Primary 按鈕 | 萊姆綠填色 | `#2563eb` 或深灰 `#374151`；萊姆僅限品牌頁 |
| Form select | `4px 4px 0` shadow | 扁平；或 `box-shadow: none` |
| Workbench 側欄 | 深紫 void | `#1f2937` 或 `#111827`（無洋紅） |
| Active nav | 萊姆左條 | `#3b82f6` 或 2px 灰白條 |
| Badge | 高飽和 alert 色 | 低飽和背景 + 深色文字（Polaris 風格） |

### 5.2 P0 — 文件與範例拆分

README 應分兩套完整截圖：

1. **Consumer** — 訪客首頁、活動卡、配對 CTA（現有）
2. **Ops Calm** — 舉報列表、審核佇列（中性、扁平）

並明確寫：

> 禁止在 Ops 頁直接使用 `psy-btn-primary`（萊姆）、`form-select` 預設 shadow，除非加 `ops` 修飾類。

### 5.3 P1 — 元件級修飾類

| 元件 | 建議 class |
|------|------------|
| 篩選按鈕 | `psy-btn-primary--ops` 或 `psy-btn--ops` |
| 下拉 | `form-select--ops`（無 offset shadow） |
| 表格 | `data-table--ops` / `table-card--ops`（細框） |
| Filter bar | `psy-filter-bar--ops`（無 hard shadow） |

### 5.4 P1 — 視覺回歸基準

提供 `examples/admin-reports.html` 靜態頁 + 參考截圖（對標 Polaris IndexTable 密度），避免消費端各專案自行猜測。

### 5.5 P2 — 語意釐清

- `psy-badge-status--info` 在實機偏粉紅（截圖「已檢視」），與「info 藍」心智不符 → 調色或改名。
- `psy-workbench-page-header__title` 使用 display 字體 800 weight 在資料頁過重 → Ops 改 600–700。

---

## 6. 建議 Rave Connect 過渡做法（Mimosa 未發版前）

**不要**回退到自訂 `#121218` admin-shell（已刪除），**也勿**全量硬套現行 brutal primitive。

建議折衷：

```text
1. 保留 psy-page-workbench / psy-workbench-shell / nav 結構（語意正確）
2. 在 apps/web admin route scope 加 admin-ops-calm.css：
   - .psy-filter-bar, .table-card, .psy-data-panel → 覆寫為 1px 邊框、無 hard shadow
   - .psy-workbench-main .psy-btn-primary → 改中性 primary（臨時）
   - .form-select → box-shadow: none; background: #fff
3. 向 Mimosa 回報本報告，追蹤官方 ops theme
4. Mimosa 發布後刪除 override，改用 data-psy-theme="ops"
```

**不建議：** 繼續向後台堆更多消費者元件（`psy-card` gradient、`psy-btn-secondary` 等）。

---

## 7. 驗收標準（Mimosa 修復後）

- [ ] `/admin/reports` 靜態範例與 Stripe／Polaris 截圖並排，**第一眼辨識為後台**而非活動 App
- [ ] 篩選列非頁面最搶眼元素（squint test 表格資料優先）
- [ ] 單頁 primary 萊姆色塊 ≤ 1 個（或 Ops 模式完全不用萊姆）
- [ ] `form-select` 在 workbench 無 offset shadow
- [ ] table／filter 邊框 ≤ 1px，shadow 為 soft 或 none
- [ ] README 明確標示 Consumer vs Ops 不可混用 token

---

## 8. 附錄 — 關鍵檔案路徑（0.3.5）

```text
node_modules/mimosa-design-system/dist/tokens.css          — psychedelic + workbench token
node_modules/mimosa-design-system/dist/tailwind/workbench.css
node_modules/mimosa-design-system/dist/tailwind/product.css  — form-select shadow
node_modules/mimosa-design-system/dist/tailwind/tables.css
node_modules/mimosa-design-system/dist/tailwind/cards.css    — gradient card
node_modules/mimosa-design-system/README.md                — Workbench 範例
```

---

## 9. 與 11-report 的關係

| 階段 | 問題 |
|------|------|
| **11-report（0.3.4 前）** | 沒 workbench、hero 漸層、無 badge／table primitive |
| **0.3.5 遷移後** | 結構正確，但 **視覺語彙仍是消費者 Neo-Brutalism** → 本報告 |

兩份報告應一併提供 Mimosa 維護者：11 = 缺什麼；12 = 有了之後為何仍不像 admin、該怎麼改。

---

**維護：** Mimosa 發布 Ops theme 後，請在本報告 §2 更新版本號並附 Before／After 截圖。
