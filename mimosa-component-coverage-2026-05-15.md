# Mimosa Design System — 元件涵蓋度報告

**日期：** 2026-05-15
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
| **Avatar** | 單一 Avatar 佔位 | ⚠️ 僅佔位圖 |
| **Card** | Panel（主系統）、Card（僅存在於 page-specific CSS）| ⚠️ 未納入核心 |

---

## 主流元件缺口

以下元件在 Material Design、Ant Design、shadcn/ui 等主流系統中屬標準配備，目前 Mimosa 完全缺少：

### 高優先級（常見互動必備）

| 元件 | 說明 |
|---|---|
| **Modal / Dialog** | 所有 UI 都需要，目前完全無 overlay 元件 |
| **Toast / Snackbar** | 短暫操作回饋通知，與 Alert 功能不同 |
| **Dropdown / Menu** | 下拉選單、Context menu |
| **Tabs** | 頁籤切換，目前只有 Side Nav 做頁間導覽 |
| **Loading / Spinner** | 非同步等待狀態，目前完全缺席 |

### 中優先級（多數應用場景需要）

| 元件 | 說明 |
|---|---|
| **Tooltip** | 懸浮說明文字 |
| **Drawer / Offcanvas** | 側拉抽屜，行動裝置導覽常見 |
| **Pagination** | 分頁元件 |
| **Breadcrumb** | 路徑導覽 |
| **Progress Bar** | 進度 / 步驟展示 |
| **Skeleton / Placeholder** | 載入佔位骨架 |
| **Toggle Switch** | 有 checkbox / radio 但無開關式 Toggle |
| **Stepper** | 多步驟流程（帳號設定、付款流程已存在但無元件抽象）|

### 低優先級（情境性需求）

| 元件 | 說明 |
|---|---|
| **Slider / Range** | 數值範圍選取 |
| **File Upload** | 檔案上傳觸發區 |
| **Empty State** | 無資料時的引導畫面 |
| **Avatar Stack** | 多人頭像疊加（pair CSS 有但未納入核心）|
| **Timeline** | 時間序列展示 |
| **Stat / Metric Card** | 數據指標卡片 |
| **Divider** | 分隔線元件 |

---

## 現有元件的不完整之處

| 元件 | 缺少的變體 |
|---|---|
| **Button** | Ghost、Icon-only、Button group / Split button |
| **Input** | Input with icon / prefix / suffix、Input group、OTP / PIN 輸入 |
| **Table** | 排序狀態、Row selection、固定列 / 欄、空態 |
| **Avatar** | 有圖版本、尺寸變體、Avatar group |
| **Navigation** | 行動裝置 hamburger menu、Mega menu、Mobile bottom nav |

---

## 總結

核心元件已覆蓋約 **55–60%** 的主流需求，表單系統和版面配置是最完整的部分。

最需要補齊的是：

1. **互動覆疊層**（Modal、Drawer、Dropdown、Toast）— 幾乎所有應用介面的基礎依賴
2. **狀態回饋元件**（Spinner、Skeleton、Progress Bar）— 非同步操作的必要回饋機制

Card 元件雖已出現在各 page-specific CSS（account / chat / event / pair），建議統一提取為核心元件並納入 `styles.css`。
