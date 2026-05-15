# v16-psychedelic Design Language（2026）

本資料夾為 **v15 Neo-Brutalism Test／Psychedelic** 的正式定稿副本：視覺與結構沿用該版，並以 **v9 相同的五層 token 架構** 管理設計系統。

核心目標：**所有色票、字級、間距、邊框、陰影與動效一律由 `theme-tokens.css` 定義**；`styles.css` 只描述元件組合與狀態，不在元件內散落魔法數字（除 token 檔內的基準值）。

**Token 與元件文件**：開啟 `design-system.html`（字體 [NASA WDS Typography](https://nasa.github.io/nasawds-site/components/typography/)、色彩 [NASA WDS Colors](https://nasa.github.io/nasawds-site/components/colors/)、版面 [NASA WDS Grids](https://nasa.github.io/nasawds-site/components/grids/)、按鈕 [NASA WDS Buttons](https://nasa.github.io/nasawds-site/components/buttons/)、標籤 [NASA WDS Labels](https://nasa.github.io/nasawds-site/components/labels/)、表格 [NASA WDS Tables](https://nasa.github.io/nasawds-site/components/tables/)、提示 [NASA WDS Alerts](https://nasa.github.io/nasawds-site/components/alerts/)、手風琴 [NASA WDS Accordions](https://nasa.github.io/nasawds-site/components/accordions/)、表單 [NASA WDS Form controls](https://nasa.github.io/nasawds-site/components/form-controls/)、範本 [NASA WDS Form templates](https://nasa.github.io/nasawds-site/components/form-templates/)、搜尋 [NASA WDS Search bar](https://nasa.github.io/nasawds-site/components/search-bar/)、側邊導覽 [NASA WDS Side navigation](https://nasa.github.io/nasawds-site/components/sidenav/)、頁首 [NASA WDS Headers](https://nasa.github.io/nasawds-site/components/headers/)、頁尾 [NASA WDS Footers](https://nasa.github.io/nasawds-site/components/footers/)）。

---

## Token 為唯一視覺決策來源

- 全站 `@import "./theme-tokens.css"`（由 `styles.css` 引入）
- CSS 變數前綴：`--psy-*`（Psychedelic），與 v9 的 `--nb-*` 對應同一套分層概念，版本間互不耦合

---

## 五層規劃（對齊 v9）

1. **Color System**：**Primitive**（唯一 hex）→ **Color system（對齊 [NASA WDS Colors](https://nasa.github.io/nasawds-site/components/colors/) 分層）**：`--psy-color-*` 含 Primary／Secondary／Background／Tertiary／Special state → **Semantic**（`--psy-surface-*`、`--psy-text-*` 等，引用上層）→ **Component alias**（nav、button、chip、badge、kicker）。對比組合見 `--psy-a11y-*`。
2. **Typography**：Display 家族 `Baloo 2`、內文 `Noto Sans TC`；含 display／h1／h2／h3／body／subtitle／small／chip／caption／button／brand 等字級與行高、字距。
   - Vertical rhythm 準則：網站以 spacing scale 與 line-height 倍數為主，不強制 baseline grid。
   - 採雙節奏：長文閱讀區（較寬鬆）與介面模組區（4/8pt 家族較緊湊）分流。
3. **Spacing / Border / Shadow**：統一間距尺度與 **3px** 區塊邊框、硬陰影 `8px 8px 0`。
4. **Interactive States**：`hover` / `active`（含微量位移與陰影收斂）/ `:focus-visible`（萊姆色 focus ring）/ `disabled`（透明度與灰化背景）。
5. **Motion**：`fast` / `normal` / `slow` 與 standard／bounce easing。

---

## 風格關鍵字（Psychedelic × Neo-Brutalism）

- **行為色**：主要按鈕＝萊姆綠（綠燈／確認），次要按鈕＝琥珀黃（`--psy-action-primary-bg`／`secondary-bg`）
- 深紫頁面＋高飽和螢光色塊、硬派黑框與硬陰影
- 導航與主視覺使用漸層拼貼，維持可讀與區塊分明
- 可及性：`focus-visible` 一律可見，不依賴僅顏色傳達狀態

---

## 擴張準則

- 新頁面複用現有 class（`.top-nav`、`.panel`、`.button` 等）或在其上疊加結構，**新增語意色請先補 primitive／semantic，再引用**
- 調整品牌色：僅改 `theme-tokens.css`，避免在 HTML 內聯樣式
