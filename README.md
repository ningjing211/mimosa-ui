# Mimosa Design System

Mimosa 是以 **Tailwind v4 + CSS tokens** 為核心的 **CSS UI package**，提供：

- `--psy-*` design tokens（`tokens.css`）
- Tailwind 入口與 partials（`tailwind.css`、`tailwind/*`）— 供 Host App 自行編譯
- 文件站使用的編譯後 CSS（`dist/mimosa.css`）— 僅供本 repo 靜態文件頁面載入

## 安裝

```bash
npm install mimosa-design-system
npm install tailwindcss@^4
```

## 公開入口（npm `files`: `dist/`）

| 入口 | 說明 |
|------|------|
| `.` / `tailwind.css` | **Host App 建議**：入口 + partials（需專案內 Tailwind v4 建置） |
| `tokens.css` | 僅 `--psy-*` |
| `tokens.json` | 由 `tokens.css` 衍生的 tooling 格式 |
| `tailwind/*.css` | 自行組裝 partials |

## Host App 使用（建議）

```js
import "mimosa-design-system/tailwind.css";
```

專案需設定 Tailwind v4（peer dependency）。

套件已宣告 `"sideEffects": ["**/*.css"]`，Webpack、Vite、Rollup 等 bundler 不需額外設定即可正確保留樣式，不會因 tree-shaking 而靜默丟棄 CSS。

## 建置套件產物

維護本 repo 時：

```bash
npm install
npm run build
```

產出並 **commit** npm 發佈內容：`dist/tokens.css`、`dist/tokens.json`、`dist/tailwind.css`、`dist/tailwind/*`。  
`dist/mimosa.css` 不屬於 npm 對外公開入口；它由 `scripts/build-docs.mjs` 為文件站額外編譯，僅供本 repo 的靜態 HTML 載入。

## 文件站（靜態 · GitHub Pages）

```text
docs/
  index.html
  design-system.html
  assets/docs.css      # 僅 .ds-* 文件版面
  mimosa-entry.css     # 僅 CI 編譯 mimosa.css 用（非 npm 匯出）
```

HTML 載入（原始碼路徑）：

```html
<link rel="stylesheet" href="../dist/mimosa.css" />
<link rel="stylesheet" href="./assets/docs.css" />
```

- **無** 本地 `npm run serve`；預覽請用 [GitHub Pages](https://pages.github.com/) 或瀏覽器直接開啟 `docs/*.html`（需已有 `dist/mimosa.css`）。
- CI 執行 `npm run build` 與 `node scripts/build-docs.mjs`，部署產物目錄 `.site/`（gitignore）。

## 專案結構

```text
src/theme/          # 唯一 CSS 原始碼
  tokens.css
  tailwind.css
  tailwind/*.css
dist/                 # npm 發佈內容（已 commit）
docs/                 # 靜態文件 HTML + docs.css
scripts/
  build.mjs           # 套件 dist 複製 + tokens.json
  build-docs.mjs      # 僅文件站：編譯 mimosa.css、組 .site/
```
