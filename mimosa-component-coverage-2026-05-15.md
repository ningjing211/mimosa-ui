# Mimosa Design System — 元件涵蓋度報告

**日期：** 2026-05-15（更新 2026-05-16）
**分支：** design/web-style-mockup
**來源：** `mock-up/web-home/v16-psychedelic/`

---

## 已涵蓋元件

| 分類 | 元件 | 狀態 |
|---|---|---|
| **按鈕** | Button（primary / secondary / disabled）、`ds-btn`（primary / secondary / inverse / lg）| ✅ 基礎完整 |
| **表單** | Input、Select、Textarea、Label、Hint、Fieldset / Legend、Checkbox / Radio group | ✅ 基礎完整 |
| **表單驗證** | Error state、Success state、Error message group | ✅ 完整 |
| **搜尋** | Search bar（big / small）| ✅ |
| **Alert / 通知** | Alert（success / warning / error / info / on-dark）| ✅ 完整 |
| **Badge / Tag** | Badge、Label pill（info / warning / hot / soft）、Chip | ✅ |
| **Accordion** | 基本型、bordered 型 | ✅ |
| **Table** | Data table、borderless 變體 | ✅ 基礎完整 |
| **Navigation** | Site Header（dark / extended）、Side Nav（含子層）、Top Nav | ✅ 基礎完整 |
| **Footer** | Site Footer（big / medium / slim，含 grid / signup）| ✅ |
| **版面配置** | 12 欄 Grid、Form Grid、layout-grid（兩欄）、Col helpers | ✅ |
| **Typography** | H1–H3、Subtitle、Kicker、Brand、Muted、Prose / Rhythm stack | ✅ |
| **無障礙** | Skip nav、`.sr-only` | ✅ |
| **Card** | `.card` / `.card__header|body|footer`、`.well`（`tailwind/cards.css`）| ✅ 基礎完整 |
| **Modal / Drawer** | `.modal`、`.drawer`（`tailwind/overlays.css`）| ✅ 基礎完整 |
| **Toast** | `.toast`、`.toast-stack`（`tailwind/feedback.css`）| ✅ 基礎完整 |
| **Tabs** | `.tabs`、`.tabs__tab`、`.tabs__panel`（`navigation-ui.css`）| ✅ 基礎完整 |
| **Dropdown** | `.dropdown`、`.dropdown__menu`（`navigation-ui.css`）| ✅ 基礎完整 |
| **Spinner** | `.spinner`（sm / lg）| ✅ |
| **Drawer** | 見 Modal 列 | ✅ |
| **Tooltip** | `.tooltip`（`navigation-ui.css`）| ✅ 基礎 |
| **Pagination** | `.pagination` | ✅ 基礎完整 |
| **Breadcrumb** | `.breadcrumb` | ✅ 基礎完整 |
| **Progress Bar** | `.progress` | ✅ 基礎完整 |
| **Skeleton** | `.skeleton`、`.empty-state` | ✅ 基礎完整 |
| **Toggle Switch** | `.switch`（`product.css`）| ✅ 基礎完整 |
| **Divider** | `.divider` | ✅ 基礎完整 |
| **Avatar** | `.avatar`（sm / md / lg / xl）、`.avatar__img`、`.avatar-stack`（`avatar.css`）| ✅ 基礎完整 |
| **Range** | `.range`、`.range-field`（`forms-extended.css`）| ✅ 基礎完整 |
| **File upload** | `.file-upload`（`forms-extended.css`）| ✅ 基礎完整 |
| **Timeline** | `.timeline`、`.timeline__item`（`data-display.css`）| ✅ 基礎完整 |
| **Stat card** | `.stat-card`（`data-display.css`）| ✅ 基礎完整 |

---

## 主流元件缺口

### 高優先級

| 元件 | 說明 |
|---|---|
| — | 高優先互動元件已具基礎 CSS；待補 host JS 行為與進階變體 |

### 中優先級

| 元件 | 說明 |
|---|---|
| **Stepper** | 多步驟流程元件抽象 |

### 低優先級

| 元件 | 說明 |
|---|---|
| — | 低優先展示型元件已具基礎 CSS（見 Extended 文件區）|

---

## 現有元件的不完整之處

| 元件 | 缺少的變體 |
|---|---|
| **Button** | Ghost、Icon-only、Button group / Split button |
| **Input** | Input with icon / prefix / suffix、Input group、OTP / PIN 輸入 |
| **Table** | 排序狀態、Row selection、固定列 / 欄、空態 |
| **Avatar** | 線上圖示狀態（online dot）、可點擊連結包裝 |
| **Range** | 雙拇指區間、刻度標籤 |
| **Navigation** | 行動裝置 hamburger menu、Mega menu、Mobile bottom nav |
| **Modal / Drawer** | 尺寸變體、焦點陷阱、動畫（host 實作）|
| **Toast** | 佇列動畫、自動關閉（host 實作）|

---

## 架構備註

- **Tailwind**：版面 utility（`flex`、`gap-psy-*`、`max-w-*`）
- **Raw CSS**：`avatar.css`、`forms-extended.css`、`data-display.css` 等 partial；token 定義於 `tokens.css`
- **Surface 原則**：elevated 元件使用 `--psy-surface-card` + `--psy-text-on-light`，勿混用 `--psy-text-primary`（頁面深紫底用）
- **Elevated hover**：`--psy-elevated-hover-*` 用於 file-upload、tab、menu 等淺底互動
- **Data trend**：`--psy-semantic-trend-up/down` 用於指標增減（綠／紅）；品牌螢光萊姆（`--psy-color-secondary-lime`）不作為 stat 文字色

---

## 總結

核心與低優先展示型元件已覆蓋約 **82–85%** 的主流需求。下一步可補 **Stepper**、Button／Input 進階變體，以及 overlay／toast 的 host JS 互動範例。
