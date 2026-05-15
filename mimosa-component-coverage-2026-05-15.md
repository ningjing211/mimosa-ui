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
| **Avatar** | 單一 Avatar 佔位 | ⚠️ 僅佔位圖 |

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
| **Slider / Range** | 數值範圍選取 |
| **File Upload** | 檔案上傳觸發區 |
| **Avatar Stack** | 多人頭像疊加 |
| **Timeline** | 時間序列展示 |
| **Stat / Metric Card** | 數據指標卡片（可組合 `.card`）|

---

## 現有元件的不完整之處

| 元件 | 缺少的變體 |
|---|---|
| **Button** | Ghost、Icon-only、Button group / Split button |
| **Input** | Input with icon / prefix / suffix、Input group、OTP / PIN 輸入 |
| **Table** | 排序狀態、Row selection、固定列 / 欄、空態 |
| **Avatar** | 有圖版本、尺寸變體、Avatar group |
| **Navigation** | 行動裝置 hamburger menu、Mega menu、Mobile bottom nav |
| **Modal / Drawer** | 尺寸變體、焦點陷阱、動畫（host 實作）|
| **Toast** | 佇列動畫、自動關閉（host 實作）|

---

## 架構備註

- **Tailwind**：版面 utility（`flex`、`gap-psy-*`、`max-w-*`）
- **Raw CSS**：`overlays.css`、`feedback.css`、`navigation-ui.css` 等 partial
- **Surface 原則**：elevated 元件使用 `--psy-overlay-surface` + `--psy-overlay-fg`，勿混用 `--psy-text-primary`

---

## 總結

核心元件已覆蓋約 **75–80%** 的主流需求。下一步可補 Stepper、Slider、Avatar 變體，以及 overlay 的 JS 互動範例。
