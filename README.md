# Mimosa Design System

Mimosa 是一套以 **Tailwind v4** 與 **CSS Tokens** 為核心的 UI Design System，提供：

- **`--psy-*` Design Tokens**（`tokens.css`）
- **Tailwind 入口與 partials**（`tailwind.css`、`tailwind/*`）— 供 Host App 自行編譯使用
- **文件站專用的編譯後 CSS**（`dist/mimosa.css`）— 僅供本 repo 靜態頁面載入，**不作為** npm 對外入口

## 安裝

```bash
npm install mimosa-design-system
npm install tailwindcss@^4
```

## 公開入口（npm `files`: `dist/`）

| 入口 | 說明 |
|------|------|
| `.` / `tailwind.css` | Host App **建議**使用的入口（需於專案內自行建置 Tailwind v4） |
| `tokens.css` | 僅包含 `--psy-*` Design Tokens |
| `tokens.json` | 由 `tokens.css` 轉換而成的 tooling 格式 |
| `tailwind/*.css` | 可依需求自由組裝使用的 partials |

## Host App 使用方式（建議）

```js
import "mimosa-design-system/tailwind.css";
```

Host App 需自行安裝並設定 **Tailwind v4**（peer dependency）。

在 HTML／JSX 中，可直接搭配 Tailwind utilities 與 Mimosa 元件 class 使用，例如：

```html
<button class="psy-btn">Button</button>
<input class="form-input" />
```

套件已宣告：

```json
"sideEffects": ["**/*.css"]
```

因此在 Webpack、Vite、Rollup 等 bundler 中，**無需額外設定**即可正確保留 CSS，不會被 tree-shaking 移除。

## 套件建置與發佈

此段落主要供套件維護者使用。

若你正在開發或準備發佈 Mimosa Design System，請先安裝依賴並執行建置：

```bash
npm install
npm run build

建置完成後，會產生 npm 發佈所需的檔案：

- `dist/tokens.css`
- `dist/tokens.json`
- `dist/tailwind.css`
- `dist/tailwind/*`

### 關於 `dist/mimosa.css`

`dist/mimosa.css` **不屬於** npm 對外入口。

此檔案由 `scripts/build-docs.mjs` 額外編譯產生，僅供文件站靜態頁面使用。

## 文件站（GitHub Pages）

```text
docs/
  index.html
  design-system.html
  assets/docs.css
  mimosa-entry.css
```

- **docs.css**：文件站本身的版面樣式
- **mimosa-entry.css**：用於編譯文件站所需的 mimosa.css

文件站會載入：

```html
<link rel="stylesheet" href="../dist/mimosa.css" />
<link rel="stylesheet" href="./assets/docs.css" />
```

其中：

- **mimosa.css** 提供 Design System 樣式
- **docs.css** 提供文件站版面樣式

## 預覽與部署

可直接開啟 docs/*.html 預覽，或透過 GitHub Pages 部署。

CI 會執行：

npm run build
node scripts/build-docs.mjs

並將最終靜態網站輸出至：

.site/

最終部署目錄為 `.site/`（已加入 `.gitignore`）。

## 專案結構

```text
src/theme/            # CSS 原始碼
  tokens.css
  tailwind.css
  tailwind/*.css

dist/                 # npm 發佈內容（需 commit）

docs/                 # 靜態文件頁面與 docs.css

scripts/
  build.mjs           # 建立 dist 與 tokens.json
  build-docs.mjs      # 編譯 mimosa.css 並組裝 .site/
```
