# Mimosa Design System — 元件涵蓋度報告

**日期：** 2026-05-15（更新 2026-05-16）
**分支：** design/web-style-mockup
**來源：** `mock-up/web-home/v16-psychedelic/`

---

## 已涵蓋元件

| 分類 | 元件 | 狀態 |
|---|---|---|
| **按鈕** | Button（primary / secondary / disabled）、`ds-btn`（primary / secondary / inverse / lg）| ✅ 基礎完整 |
| **按鈕變體** | Ghost、Icon-only、Button group、Split button（`component-variants.css`）| ✅ 基礎完整 |
| **表單** | Input、Select、Textarea、Label、Hint、Fieldset / Legend、Checkbox / Radio group | ✅ 基礎完整 |
| **表單變體** | Input group（prefix/suffix）、OTP / PIN（`component-variants.css`）| ✅ 基礎完整 |
| **表單驗證** | Error state、Success state、Error message group | ✅ 完整 |
| **搜尋** | Search bar（big / small）| ✅ |
| **Alert / 通知** | Alert（success / warning / error / info / on-dark）| ✅ 完整 |
| **Badge / Tag** | Badge、Label pill（info / warning / hot / soft）、Chip | ✅ |
| **Accordion** | 基本型、bordered 型 | ✅ |
| **Table** | Data table、borderless 變體 | ✅ 基礎完整 |
| **Table 變體** | 排序、checkbox 選取、`.data-table--uniform-rows`、獨立空態表（`component-variants.css`）| ✅ 基礎完整 |
| **Navigation** | Site Header（dark / extended）、Side Nav（含子層）、Top Nav | ✅ 基礎完整 |
| **Navigation 變體** | Hamburger、Mega menu、Mobile bottom nav（`navigation-mobile.css`）| ✅ 基礎完整 |
| **Footer** | Site Footer（big / medium / slim，含 grid / signup）| ✅ |
| **版面配置** | 12 欄 Grid、Form Grid、layout-grid（兩欄）、Col helpers | ✅ |
| **Typography** | H1–H3、Subtitle、Kicker、Brand、Muted、Prose / Rhythm stack | ✅ |
| **無障礙** | Skip nav、`.sr-only` | ✅ |
| **Card** | `.card` / `.card__header|body|footer`、`.well`（`tailwind/cards.css`）| ✅ 基礎完整 |
| **Modal / Drawer** | `.modal`、`.drawer`；尺寸 sm/lg/xl、入場動畫 class（`overlays.css`）| ✅ 基礎完整 |
| **Toast** | `.toast`、`.toast-stack`；進場/離場動畫 class（`feedback.css`）| ✅ 基礎完整 |
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
| **Avatar** | `.avatar`（sm / md / lg / xl）、`.avatar__img`、`.avatar-stack`、online 狀態、連結包裝 | ✅ 基礎完整 |
| **Range** | `.range`、`.range-field`、雙端 `.range-dual`、刻度 `.range-ticks` | ✅ 基礎完整 |
| **File upload** | `.file-upload`（`forms-extended.css`）| ✅ 基礎完整 |
| **Timeline** | `.timeline`、`.timeline__item`（`data-display.css`）| ✅ 基礎完整 |
| **Stat card** | `.stat-card`（`data-display.css`）| ✅ 基礎完整 |

---

## 主流元件缺口

### 高優先級

| 元件 | 說明 |
|---|---|
| — | 高優先互動元件已具基礎 CSS |

### 中優先級

| 元件 | 說明 |
|---|---|
| **Stepper** | 多步驟流程元件抽象 |

### 低優先級

| 元件 | 說明 |
|---|---|
| — | 低優先展示型元件已具基礎 CSS |

---

## 現有元件的不完整之處

| 元件 | 缺少的變體 |
|---|---|
| **Table** | 固定欄 sticky-col 需寬表實測；排序/選取需 host 切換 class |
| **Range** | 真・雙拇指單一 `input`（需 JS 或 polyfill）|
| **Modal / Drawer** | 焦點陷阱、ESC 關閉、捲動鎖定（host 實作）|
| **Toast** | 自動關閉計時、佇列堆疊邏輯（host 實作；CSS 已提供 `is-leaving`）|
| **Navigation** | Mega / mobile panel 開合邏輯（host 實作）|

---

## 架構備註

- **Tailwind**：版面 utility（`flex`、`gap-psy-*`、`max-w-*`）
- **Raw CSS**：`component-variants.css`、`navigation-mobile.css` 等 partial；token 定義於 `tokens.css`
- **Surface 原則**：elevated 元件使用 `--psy-surface-card` + `--psy-text-on-light`，勿混用 `--psy-text-primary`
- **Elevated hover**：`--psy-elevated-hover-*` 用於 file-upload、tab、menu 等淺底互動
- **Data trend**：`--psy-semantic-trend-*-fg` + 中性 `*-bg`（金融儀表板 pill）
- **Stat card 底**：`--psy-stat-surface*` 暖黃中性（勿用含洋紅的 `--psy-gradient-card-wash`）
- **Kicker 配對**：淺底 `.psy-kicker`；深紫底 `.psy-kicker-on-dark` + `--psy-surface-on-dark`
- **Overlay 動效**：host 加 `modal--animated` / `toast-stack--animated`；關閉 toast 前加 `.is-leaving`
- **Table 展示**：一表一狀態；清單用 `--uniform-rows`；空態勿與資料列同表
- **Form 配對**：深紫頁 `.form-label` / `.form-hint`；淺底加 `--on-light`（hint 修飾類須在 base 之後）
- **Input group / OTP**：單一 `.input-group`／`.otp-input` 外框；金額用 `.input-group--amount`；OTP 勿每格獨立 shadow
- **Table（Untitled 節奏）**：`tables.css` — `.table-card`、Divider（`--uniform-rows`+hover）、Striped（`--striped`）、`--sm`；表頭 muted 灰帶、排序僅圖示

---

## 總結

核心與常用變體已覆蓋約 **88–92%** 的主流需求。下一步可補 **Stepper**，以及 overlay／toast／nav 的 host JS 互動範例。
