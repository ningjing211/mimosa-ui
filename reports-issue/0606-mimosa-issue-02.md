# 11 Report — Web 管理後台套用 Mimosa 消費者 Surface 導致視覺層級與語意崩壞

**建立日期：** 2026-06-06  
**回報對象：** `mimosa-design-system` 維護者（§4～§6）；Rave Connect Web 前端（§3、§7～§8）  
**關聯文件：** [`admin-ui-style-optimization-plan.md`](../dev/admin-ui-style-optimization-plan.md)、`06-UI-002-20`  
**實測頁面：** `http://localhost:4200/admin/reports`（`mimosa-design-system` 隨 `app.css` 載入，版本以 `package.json` 為準）

---

## 1. 摘要（給 Mimosa 作者的一頁版）

| 項目 | 說明 |
|------|------|
| **現象** | 管理後台列表頁視覺層級扁平、狀態語意不清、整體像「消費者 App 活動頁」而非 B2B 工作台。 |
| **直接原因** | Admin 未定義獨立 surface，全站 `body` 使用 `--psy-gradient-hero-panel`；表格與篩選器直接浮在 hero 漸層上。 |
| **Mimosa 層面** | 設計系統強項在 **neo-brutalist 消費者 CTA** 與 **on-dark hero**；**缺少** admin workbench surface、status badge、data table、filter toolbar 等 B2B primitive 與文件。 |
| **消費端誤用** | 側欄登出使用 `psy-btn-secondary`（黃色 CTA）於導覽場景；副標硬編碼 `#666` 在深底不可讀。 |
| **建議 Mimosa** | 補 admin／workbench surface token、status badge 系列、表格容器範例、釐清 secondary 按鈕在 nav 的使用邊界。 |
| **建議 Rave** | Route-level admin theme 隔離 hero；Phase A CSS 修正（見優化計畫 §4）。 |

---

## 2. 專案 Context

### 2.1 產品定位

- **頁面：** Web 管理後台 `/admin/*`（US-022），與一般使用者 `/login`、`/events` **UI 與導流獨立**（`06-ui-ux.md`）。
- **目前 MVP：** `/admin/login`、`/admin/reports`（mock 舉報列表）。
- **使用者：** 內部管理者；任務為 **高資訊密度掃描、篩選、處置**，不是品牌行銷或活動探索。

### 2.2 技術整合

```text
Web styles entry:
  apps/web/src/styles.css
    → shared/frontend/styles/app.css
      → @import "mimosa-design-system/tailwind.css"
      → body { background: var(--psy-gradient-hero-panel), var(--psy-surface-page-deep); }

Admin 元件:
  apps/web/src/app/features/admin/shell/admin-shell.component.*
  apps/web/src/app/features/admin/reports/admin-reports.page.*
  @rave/frontend/ui → rave-button（psy-btn-primary / secondary）
```

### 2.3 與既有 Mimosa 報告關係

| 報告 | 主題 | 與本報告關聯 |
|------|------|----------------|
| `04-report-guest-home-mimosa-visual-hierarchy-contrast.md` | 深底 hero 上 `#666` 不可讀 | 同根因：**hero surface 上套用淺色頁灰字**；admin 副標重犯 |
| `02-report-mimosa-design-system-ui-contrast-after-upgrade.md` | 淺色 card 對比 | Admin 若改淺色 workbench 需避免 kicker／muted 過淡 |
| `06-report-mobile-surface-pairing-and-mimosa-gaps.md` | surface 配對 | Admin 需要**第三種** surface 家族（workbench），非 on-dark hero 亦非 on-light card |

---

## 3. 問題詳述（附截圖觀察）

### 3.1 全站 Hero 漸層滲透 Admin

**現象：** 主內容區背景為紫紅→橄欖綠 hero 漸層（與 `/`、`/events` 一致）。

**問題：**

- B2B admin 慣例使用 **低彩度 neutral surface**（參考 Ant Design Pro、shadcn `bg-background`、M3 `surface-container`），讓注意力集中在資料與狀態。
- 漸層在表格區域造成 **視覺噪音**，列與列邊界難辨識。
- 長時間審核工作易疲勞。

**責任：**

- **Rave：** admin route 未 scope 覆寫（應在 `.admin-shell` 隔離）。
- **Mimosa：** 文件未說明「hero gradient 僅限 consumer landing／exploration」，缺少 `psy-page-workbench` 或等價 token。

### 3.2 視覺層級扁平（Squint test 失敗）

| 元素 | 現況 | 問題 |
|------|------|------|
| 頁面標題 `h1` | 1.5rem 白字 | 與表頭字級差距不足 |
| 副標 | `#666` | 在深漸層上 **對比不足**（< 4.5:1） |
| 篩選 label | 0.875rem 白字 | 與表格內容同權重 |
| 表頭 `th` | 0.875rem / 600 | 無獨立背景區塊 |
| 儲存格 `td` | 白字 | 與表頭僅差 font-weight |
| 登出按鈕 | `psy-btn-secondary` 黃色填色 | **視覺權重高於** active nav |

**業界對照：** Dashboard 文章建議 headline ≥ body **1.6×**；filter toolbar 置於獨立 container；表頭 sticky + 背景分區。

### 3.3 視覺邏輯不足（語意未編碼）

**現象：** 表格直接輸出 API enum：

```text
PENDING | REVIEWED | RESOLVED
CHAT | PROFILE | EVENT
```

**問題：**

- 管理者需 **解讀英文常數** 才能理解案件狀態與來源。
- 無 color coding（Ant Design Badge `status: Processing | Success | Default`）。
- 無法「掃一眼」掌握待處理佔比。

**SDD 期待（`### Admin Reports`）：** 列表顯示來源、對象、時間、**狀態** — 狀態應為可快速辨識的 **視覺單元**，不是 raw string。

### 3.4 互動控件不像控件

- `<select>` 為瀏覽器預設樣式，與深色背景融合。
- 「套用篩選」為裸 `<button>`，無 Mimosa `psy-btn` 外形。
- 使用者難以區分「可點」與「說明文字」。

**對照：** shadcn Data Table 篩選列使用 `Input` + `Select` + `Button variant="outline/default"` 統一高度與 border。

### 3.5 側欄導覽語意

| 項目 | 現況 | 建議 |
|------|------|------|
| Active | `rgba(255,255,255,0.12)` 背景 | 可加左側 accent 條 |
| Disabled | `#888` 文字 | 加「即將推出」或 lock icon |
| 登出 | 底部大黃按鈕 | **不應**使用 consumer secondary CTA |

**Mimosa 邊界：** `psy-btn-secondary` 文件定義為並排 CTA **第二順位**（活動卡「感興趣」等），不是 sidebar destructive／exit 動作。

---

## 4. 建議 Mimosa Design System 補強項目

### 4.1 P0 — Admin / Workbench Surface 家族

**缺口：** 現有 token 主要服務：

- `--psy-gradient-hero-panel` + `--psy-text-primary`（消費者深底）
- `--psy-surface-card` + `--psy-text-on-light`（淺色卡片）

**缺少：** 中性工作台 surface（可深色或淺色），用於：

- 全頁底（無漸層或極弱漸層）
- 側欄 nav
- 內容 panel
- 表格 thead／tbody hover

**建議新增（命名可調）：**

```css
/* 範例：深色 workbench */
--psy-surface-workbench: ...
--psy-surface-workbench-sidebar: ...
--psy-surface-workbench-panel: ...
--psy-text-workbench-primary: ...
--psy-text-workbench-muted: ...
--psy-border-workbench-subtle: ...
```

**文件：** 新增「Workbench / Admin」章節，明確寫：

> Hero gradient 不應作為 data-heavy admin 頁全頁背景。

### 4.2 P0 — Status Badge / Tag 語意組件

**缺口：** 有 `psy-chip`（興趣標籤），但無 **moderation / ops** 語意：

| 語意 | 建議 variant |
|------|----------------|
| 待處理 | `psy-badge-status-warning` |
| 處理中 | `psy-badge-status-processing` |
| 已結案 | `psy-badge-status-success` |
| 已檢視 | `psy-badge-status-info` |
| 已關閉 | `psy-badge-status-default` |

**參考：** Ant Design Badge `status` prop；需定義 bg／fg 在 **workbench panel** 上的對比。

### 4.3 P1 — Data Table 容器 primitive

**缺口：** 無 table container 範例（thead 背景、row hover、sticky header、empty state 置於容器內）。

**建議：**

- `psy-table` 或 `psy-data-panel` 文件範例
- 定義 row height（compact / comfortable）
- 與 `psy-empty-state` 在 panel 內的配對

### 4.4 P1 — Form controls（Select / Filter bar）

**缺口：** 消費者 auth 表單用 `.form-input`；admin 篩選用原生 `<select>` 無樣式。

**建議：**

- `psy-select` 或文件化「native select 最小樣式」
- `psy-filter-bar` layout 範例（label + control + action 對齊）

### 4.5 P2 — 按鈕語意擴充

| 現有 | 缺口 |
|------|------|
| `psy-btn-primary` | — |
| `psy-btn-secondary` | 不應作為 sidebar 登出預設 |
| `psy-btn-ghost-on-dark` | 可考慮 `psy-btn-ghost-on-workbench` |
| — | `psy-btn-danger` / `psy-btn-danger-outline` 用於登出、停權 |

**文件補充：** 並排 CTA 規則 **不適用** 於 admin 側欄單獨動作。

### 4.6 P2 — 雙模式策略（可選）

若 Mimosa 堅持單一 dark-party 品牌，建議在文件宣告：

- **Consumer mode：** hero + neon CTA
- **Ops mode：** 允許消費端定義 `--admin-*` fallback，或提供 official `mimosa-admin.css` 子套件

---

## 5. 建議 Rave Connect 短期修正（不依賴 Mimosa 發版）

詳見 [`admin-ui-style-optimization-plan.md`](../dev/admin-ui-style-optimization-plan.md) Phase A：

1. `.admin-shell` 覆寫背景，隔離 hero gradient
2. 表格包入 `.admin-panel`
3. 副標改用可讀 muted token
4. 狀態欄 CSS badge + 繁中 label
5. 登出改 ghost／danger variant
6. 篩選列容器 + `rave-button primary`

---

## 6. 重現步驟

```text
1. npm run start:web
2. 開啟 http://localhost:4200/admin/login
3. admin@rave.test / Password1
4. 進入 /admin/reports
5. 觀察：漸層背景、白字表格、黃色登出、英文 status
```

**DevTools 檢查：**

```text
body → background: var(--psy-gradient-hero-panel), var(--psy-surface-page-deep)
.admin-reports__header p → color: #666
.admin-shell__sidebar → background: #111（硬編碼，非 token）
rave-button → psy-btn psy-btn-secondary（登出）
```

---

## 7. 驗收標準（Mimosa 修復後）

- [ ] 提供 workbench surface token 與文件範例
- [ ] status badge 在 panel 上通過 4.5:1 對比
- [ ] 文件明確禁止 hero gradient 作為 admin 全頁底
- [ ] 提供 data table 容器範例（含 empty state）
- [ ] 釐清 secondary 按鈕在 nav／sidebar 的使用邊界

---

## 8. 驗收標準（Rave Phase A 完成後）

- [ ] `/admin/reports` 與 `/events` 背景視覺明顯區隔
- [ ] Squint test 可見側欄 + 中央 panel
- [ ] 三種案件狀態以顏色 + 繁中區分
- [ ] 登出視覺權重低於 active nav
- [ ] `admin-reports.page.spec.ts` 涵蓋 badge／label

---

## 9. 參考（業界 Admin UI Library）

| Library | 可借鏡處 |
|---------|----------|
| **Ant Design Pro** | ProLayout 側欄寬度、ProTable valueEnum + badge、page header |
| **shadcn/ui** | Sidebar、DataTable toolbar、`bg-background` 分區 |
| **Material Design 3** | Surface container 層級、on-surface variant 強調 |
| **Shopify Polaris** | IndexTable、bulk actions、filter bar |
| **Atlassian / Zendesk** | 高密度表格、compact utilitarian 色票 |

---

## 10. 附錄 — 現況問題 CSS 摘錄

```css
/* shared/frontend/styles/app.css — 影響 admin */
body {
  background: var(--psy-gradient-hero-panel), var(--psy-surface-page-deep);
}

/* admin-reports.page.css — 淺色頁思維 */
.admin-reports__header p {
  color: #666;  /* 在深 hero 上不可讀 */
}

.admin-reports__table th,
.admin-reports__table td {
  border-bottom: 1px solid #e5e5e5;  /* 淺色分隔線思維 */
}

/* admin-shell.component.css — 硬編碼 */
.admin-shell__sidebar {
  background: #111;
}
```

---

**維護：** 若 Mimosa 版本升級後 admin 頁重新驗收，請更新本報告「實測頁面」版本號與截圖日期。
