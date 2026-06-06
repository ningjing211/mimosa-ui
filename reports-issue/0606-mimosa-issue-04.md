# 13 Report — Admin Ops 主題淺色 Panel 對比度問題（登入 / 詳情 / 表單）

**建立日期：** 2026-06-06  
**實測環境：** `mimosa-design-system@0.3.6`、`data-psy-theme="ops"`、`npm run start:web`  
**關聯報告：** [`12-report-admin-workbench-neobrutalist-overfit.md`](./12-report-admin-workbench-neobrutalist-overfit.md)（Neo-Brutal 過度 → 0.3.6 Ops Calm）

---

## 1. 摘要

| 項目 | 說明 |
|------|------|
| **使用者回報** | 管理者登入標題幾乎看不見；案件詳情欄位值淡到難讀；聊天紀錄 placeholder 對比不足；**案件詳情 card 內距紊亂**（內容貼邊、處置標題與說明錯位）。 |
| **結論** | **混合原因**：(1) Ops workbench 標題 token 與淺色 panel 混用；(2) `table-card__body` **僅為表格設計、無預設 padding**；(3) 本專案 markup 未對齊 Mimosa TableCard 範例。 |
| **Mimosa 待補** | 非表格 `__body` 修飾 class 或文件範例；`__body` 文字色；Ops `::placeholder`；header 用法說明。 |
| **Rave 已修** | 對比修正 + `table-card__body:not(:has(.data-table-wrap))` 補 padding；詳情 header 標題／說明包成單欄。 |

---

## 2. 問題對照（截圖 → 根因）

### 2.1 管理者登入：「管理者登入」標題不可讀

| 觀察 | 白 card 上標題／副標接近白色 |
|------|------------------------------|
| **DOM** | `psy-card` > `psy-workbench-page-header__title` |
| **Mimosa** | `workbench.css`：`.psy-workbench-page-header__title { color: var(--psy-text-workbench-primary); }` → Ops 為 `#f9fafb`（給**深色 workbench 主區**） |
| **Mimosa** | `cards.css`：`.psy-card` 內 h1–h6 應為 `--psy-surface-card-fg`，但 **workbench header class  specificity 更高**，覆蓋 card 規則 |
| **Rave** | ❌ 在 `psy-card` 內使用 workbench page header（語意錯誤） |
| **責任** | **主要本專案**；Mimosa 文件應警示此組合 |

### 2.2 案件詳情：metadata 數值（`dd`）幾乎不可見

| 觀察 | `dt` 可讀、`dd` 極淡 |
|------|----------------------|
| **DOM** | `table-card` > `admin-report-detail__dl` > `dd` |
| **Mimosa** | `table-card` / `psy-data-panel` 設白底與邊框，**未對 `__body` 內非 table 內容設 `color: var(--psy-text-on-light)`** |
| **Mimosa** | `.psy-page-workbench { color: var(--psy-text-workbench-primary); }` 淺色文字沿承至子元素 |
| **Rave** | `dd` 未指定色，繼承 workbench 淺色字 |
| **責任** | **Mimosa 缺口 + 本專案未補 on-light** |

### 2.3 聊天紀錄：placeholder 對比不足

| 觀察 | 「例如 user_102」幾乎看不見 |
|------|------------------------------|
| **DOM** | `psy-filter-bar` 內 `.form-input`（無 `--on-light`） |
| **Mimosa** | `workbench-ops.css` 覆寫 `form-input` 的 `color` / `background`，**未覆寫 `::placeholder`** |
| **Mimosa** | `product.css`：placeholder 用 `--psy-form-placeholder-text`（消費者深色底用），在 Ops 白底上過淡 |
| **Rave** | 篩選列沿用 `form-input`，未加 `form-input--on-light`（文件建議淺底用法） |
| **責任** | **Mimosa 缺口 + 本專案未用修飾 class** |

### 2.4 表格 `data-table__cell--muted`（次要）

| 觀察 | 部分 ID 欄偏淡 |
|------|----------------|
| **Mimosa** | `--psy-text-muted-on-light: #6b7280`（Ops）對白底 **WCAG 通常可接受** |
| **Rave** | 已用 `data-table--uniform-rows` + `--cell--muted`；若仍覺淡可改 primary 欄不用 muted |
| **責任** | 多為設計取捨，非阻斷性 bug |

### 2.5 案件詳情：`table-card` 內距紊亂

| 觀察 | metadata 區貼上／下／左邊框；處置區標題左、說明右分列；表單與按鈕貼左下 |
|------|-----------------------------------------------------------------------------|
| **Mimosa** | `tables.css`：`.table-card__header` 有 `padding: var(--psy-space-6)`；**.table-card__body 無 padding**，僅定義 `.table-card__body .data-table-wrap`（假設內容永遠是表格） |
| **Mimosa** | `table-card__header` 為 `display:flex; justify-content: space-between`；**標題與說明應包在同一欄**（見 reports 列表頁範例） |
| **Rave** | 詳情 metadata 直接把 `<dl>` 放進 `table-card__body`，無 header、無 body padding |
| **Rave** | 處置區 `<h2>` 與 `<p class="table-card__description">` 為 header 的**兩個直接子元素** → flex 把說明推到右側，與標題同一行錯位 |
| **Rave** | 表單 `max-width: 24rem` 且 body 無 padding → 按鈕視覺上「黏」在 card 左下角 |
| **責任** | **Mimosa 文件／API 缺口**（body 非表格場景未文件化）+ **本專案 markup 未跟範例** |

**對照（列表頁正確用法 vs 詳情頁錯誤用法）：**

```html
<!-- ✅ admin-reports：header 內包一欄 -->
<div class="table-card__header">
  <div>
    <h2 class="table-card__title">案件列表</h2>
    <p class="table-card__description">共 N 筆</p>
  </div>
</div>
<div class="table-card__body">
  <div class="data-table-wrap">…</div>  <!-- 儲存格自帶 padding -->
</div>

<!-- ❌ admin-report-detail（修正前）：header 兩個 flex 子元素；body 無 table -->
<div class="table-card__header">
  <h2>執行處置</h2>
  <p class="table-card__description">…</p>
</div>
<div class="table-card__body">
  <dl>…</dl>  <!-- 無 padding，貼邊 -->
</div>
```

### 2.6 側欄 active 藍框（次要）

| 觀察 | 像瀏覽器 focus ring |
|------|-------------------|
| **可能** | `routerLinkActive` 後鍵盤 focus 殘留，或 Mimosa `border-left-color: #3b82f6` 2px |
| **責任** | 待手動確認；非本次對比主因 |

---

## 3. Mimosa vs Rave 責任矩陣

| # | 現象 | Mimosa | Rave | 修復方 |
|---|------|:------:|:----:|--------|
| A | 白 card 內 workbench 標題 | 缺 on-panel 變體／文件 | 誤用 class | **Rave** 改 markup |
| B | table-card 內非 table 文字 | 未 reset color | 未補 dd 色 | **兩邊**（Rave CSS 已補） |
| C | Ops 下 placeholder | 未覆寫 placeholder token | 未用 `--on-light` | **兩邊**（Rave 已補 class） |
| D | 深底主區 page header | ✅ 正確 | ✅ 無需改 | — |
| E | table-card 非表格 body 貼邊 | `__body` 無預設 padding | markup 未跟範例 | **兩邊**（Rave CSS + HTML） |
| F | 處置 header 標題／說明錯位 | header flex 契約 | 兩個直接子元素 | **Rave** 包成單欄 |

---

## 4. 本專案修正（2026-06-06）

| 檔案 | 變更 |
|------|------|
| `admin-login.page.html` | 標題改 `psy-card-title` + `psy-lead-on-light` |
| `shared/frontend/styles/admin-panel-surfaces.css` | 淺色 panel 內文字／placeholder／連結色 |
| `styles.css` | `@import` admin-panel-surfaces |
| `admin-*/*.html`（filter） | `form-input` → `form-input form-input--on-light` |
| `admin-report-detail.page.css` | `dd` on-light 色；表單 gap／max-width 微調 |
| `admin-report-detail.page.html` | 處置 `table-card__header` 標題+說明包 `<div>` |
| `admin-panel-surfaces.css` | `table-card__body:not(:has(.data-table-wrap))` 補 `--psy-space-6` padding |

---

## 5. 建議 Mimosa 0.3.7+（可選）

1. **`psy-workbench-page-header--on-panel`**：`color: var(--psy-text-on-light)` / subtitle 用 muted-on-light。  
2. **`[data-psy-theme="ops"] .table-card__body`**：`color` + 非表格場景預設 `padding`（或提供 `table-card__body--content`）。  
3. **`[data-psy-theme="ops"] .form-input::placeholder`**：對齊 `--psy-form-placeholder-text-on-light`。  
4. **README TableCard**：`__header` 內標題／說明須包同一 wrapper；`__body` 放表格以外內容時需自訂 padding 或用修飾 class。  
5. **README Workbench**：`psy-workbench-page-header` 僅用於深色主區；登入 card 用 `psy-card-title`。

---

## 6. 驗收

```text
1. npm run start:web
2. /admin/login → 標題／副標清晰可讀
3. admin@rave.test 登入 → /admin/reports/rpt_001
   - 欄位值可讀
   - metadata／處置 card 四周有均勻內距（`--psy-space-6`）
   - 「執行處置」標題與說明垂直堆疊於 header 左側，非左右分列
4. /admin/chats → placeholder「例如 user_102」可讀
5. npm run test:web（admin specs 仍通過）
```

---

**維護：** Mimosa 上游修復後，可縮減 `admin-panel-surfaces.css` 覆寫範圍並更新本報告 §4。
