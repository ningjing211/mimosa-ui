# Mimosa Design System UI Smoke 顯示異常報告

**建立日期：** 2026-06-01  
**目的：** 提供給 `mimosa-design-system` 維護者與後續 AI agent，用來判斷目前 UI smoke 頁面的顯示異常是否來自 Mimosa 樣式、使用方式、Tailwind v4 pipeline、或本專案 wrapper 實作。

## 背景

本專案正在初始化前端雙 App 架構：

- Web App：Angular + TypeScript + Tailwind CSS
- Mobile App：Ionic 8 + Angular + TypeScript + Tailwind CSS + Capacitor
- Design System：透過 npm 安裝 `mimosa-design-system`
- Mimosa 樣式入口：`mimosa-design-system/tailwind.css`
- 本專案共用樣式入口：`packages/styles/app.css`
- 本專案共用 UI wrapper：`packages/ui`

本次 smoke 頁面的目的不是建立正式產品頁，而是用最小 index 頁面確認：

- Angular / Ionic App 能正常 render。
- `packages/ui` wrapper 能被 Web / Mobile 共用。
- `packages/styles` 能載入 Mimosa / Tailwind 樣式。
- Mimosa class 套用後，基本 Button、Input、Card、EmptyState 具備可讀、可辨識、可互動的 UI。

## 目前結論

Angular / Ionic App 已經能正常 render，問題不是「畫面沒有出現」。

目前問題是：Mimosa 相關 class 套用後，畫面呈現出明顯的 UI 可讀性與元件樣式異常，例如文字顏色過暗、背景對比不足、按鈕樣式突兀、卡片內容看起來像被壓暗或被錯誤 token 影響。

換句話說，目前 smoke test 已經證明前端架構可執行，但也暴露出 Mimosa 樣式整合需要進一步確認。

## 重現環境

```text
OS: macOS
App: Mobile dev server
URL: http://localhost:49685/
Command: npm run start:mobile
Node package manager: npm
Framework:
  - Angular 20
  - Ionic 8
  - Tailwind CSS 4
  - Capacitor 8
Design System:
  - mimosa-design-system
  - import path: mimosa-design-system/tailwind.css
```

## 重現步驟

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 啟動 Mobile dev server：

   ```bash
   npm run start:mobile
   ```

3. 開啟 dev server 顯示的網址，例如：

   ```text
   http://localhost:49685/
   ```

4. 觀察 Mobile index smoke 頁。

## 相關檔案

Mimosa / Tailwind 載入位置：

```text
packages/styles/app.css
apps/mobile/src/styles.css
apps/web/src/styles.css
```

共用 UI wrapper：

```text
packages/ui/src/lib/button.component.ts
packages/ui/src/lib/card.component.ts
packages/ui/src/lib/empty-state.component.ts
packages/ui/src/lib/input.component.ts
packages/ui/src/index.ts
```

Mobile smoke 頁：

```text
apps/mobile/src/app/features/index/index.page.ts
apps/mobile/src/app/features/index/index.page.html
apps/mobile/src/app/features/index/index.page.css
```

Web smoke 頁：

```text
apps/web/src/app/features/index/index.page.ts
apps/web/src/app/features/index/index.page.html
apps/web/src/app/features/index/index.page.css
```

## 目前使用到的 Mimosa class

本專案 wrapper 目前使用的 Mimosa class 很少，主要是：

```text
psy-btn
psy-btn-primary
psy-btn-secondary
psy-btn-ghost
psy-card
form-input
```

另外頁面本身有使用少量 Tailwind utility，例如：

```text
grid
gap-2
text-sm
text-lg
font-semibold
text-slate-300
text-red-300
```

## 實際觀察到的問題

從 Mobile smoke 頁截圖可觀察到：

- 大標題與卡片標題文字過暗，幾乎融入背景。
- 卡片內容的文字對比不足，可讀性差。
- Button 顯示為高飽和黃色底，和整體深色 UI token 不協調。
- `psy-card` 的視覺邊界、背景、陰影或文字 token 看起來未達到可讀卡片效果。
- EmptyState 區塊的文字與膠囊狀 status items 雖然存在，但整體層次不穩定。
- 畫面像是有部分 token / class 生效，但沒有形成完整、可用的 component visual system。

## 預期結果

在 smoke 頁中，至少應該達到：

- `psy-card` 內文字在深色背景上清楚可讀。
- `psy-btn` / `psy-btn-primary` 有穩定且符合 Mimosa 設計語言的按鈕外觀。
- `form-input` 在 Web smoke 頁中有清楚的 input 邊界、背景與文字狀態。
- EmptyState 的標題、描述與狀態項目具備清楚層級。
- Mimosa class 與 Tailwind utility 同時存在時，不應互相覆蓋到導致可讀性失效。

## 需要 Mimosa 維護者協助確認的問題

1. `mimosa-design-system/tailwind.css` 是否是 Angular + Tailwind v4 專案正確的唯一樣式入口？
2. `psy-btn`、`psy-card`、`form-input` 是否為公開且穩定的 class API？
3. 這些 class 是否需要搭配特定 root class、theme class、CSS variables、data attribute 或 provider 才能正確顯示？
4. Mimosa 是否預設 light mode？如果要使用 dark UI，需要額外設定哪個 selector 或 token？
5. Tailwind v4 中，Mimosa 是否需要透過 `@source`、`@theme`、`@layer` 或其他設定才能完整保留 component styles？
6. `mimosa-design-system/tailwind.css` 是否會預期由 app 再提供 base token，例如 background、foreground、primary、surface、muted？
7. `psy-card` 是否本來就不包含文字色彩？如果是，使用者是否需要自行在 wrapper 補上 text color？
8. `psy-btn-primary` 顯示為亮黃色是否為預期設計？如果是，是否有 dark background 下的推薦搭配方式？

## AI Agent 排查方向

後續 AI agent 不應先假設 Angular / Ionic render 壞掉。請先確認以下項目：

1. 檢查 `packages/styles/app.css` 的 import 順序：

   ```css
   @import "tailwindcss";
   @import "mimosa-design-system/tailwind.css";
   ```

   需要確認 Mimosa 是否應該在 Tailwind 前或後載入。

2. 檢查 Mimosa package 內是否有 README、tokens、theme、layer 或 example。

3. 檢查 `psy-*` class 是否真實存在於編譯後 CSS。

4. 檢查是否有 Tailwind preflight / Ionic CSS / Mimosa base styles 互相覆蓋。

5. 在不擴大 scope 的前提下，可先用 wrapper 層補上最小可讀性樣式，例如：

   - card 內文字色
   - card background / border
   - button text color
   - input text / placeholder / border

6. 若 Mimosa 需要特定 theme root，應優先加在 app root 或 global style，而不是在每個 page 分散補 class。

7. 不要直接改 `node_modules/mimosa-design-system`。

## 最小判斷標準

若要判斷問題是否已修正，請重新執行：

```bash
npm run start:mobile
npm run start:web
npm run check
```

並確認：

- Mobile index 頁不只是有背景，而是能清楚看到標題、卡片、CTA、EmptyState 與 status items。
- Web index 頁也能清楚看到桌面版 layout、卡片與表單。
- Button / Card / Input / EmptyState 的樣式看起來像同一套 design system。
- 文字對比在深色背景上可讀。

## 附件說明

目前使用者已提供 Mobile smoke 頁截圖，截圖顯示頁面內容已 render，但 Mimosa 相關元件與文字呈現有明顯可讀性與視覺一致性問題。

若此文件要交給 Mimosa 維護者，建議一併附上截圖，並標註：

- 畫面網址：`http://localhost:49685/`
- 啟動指令：`npm run start:mobile`
- 主要問題：文字過暗、卡片與按鈕樣式不符合預期、深色背景下可讀性不足
