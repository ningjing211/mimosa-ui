# Mimosa Design System

Mimosa 是一套以 **Tailwind v4** 與 **CSS Tokens** 為核心的 UI Design System，提供：

- **`--psy-*` Design Tokens**（`tokens.css`）
- **Tailwind 樣式檔案**（`tailwind.css`、`tailwind/*`），供 Tailwind v4 專案載入與編譯使用
- **文件站使用的編譯後 CSS**（`dist/mimosa.css`），僅供本 repo 靜態頁面載入，不包含於 npm 套件使用方式中

## 安裝

```bash
npm install mimosa-design-system
npm install tailwindcss@^4
```

## 可用檔案（npm `files`: `dist/`）

| 入口 | 說明 |
|------|------|
| `.` / `tailwind.css` | Host App **建議**使用的入口（需於專案內自行建置 Tailwind v4） |
| `tokens.css` | 僅包含 `--psy-*` Design Tokens |
| `tokens.json` | 由 `tokens.css` 轉換而成的 tooling 格式 |
| `tailwind/*.css` | 可依需求自由組裝使用的 partials |

## 專案使用方式

```js
import "mimosa-design-system/tailwind.css";
```

Mimosa 以 Tailwind v4 為基礎，需透過專案中的 Tailwind pipeline 進行編譯。

在 HTML／JSX 中，可直接搭配 Tailwind utilities 與 Mimosa 元件 class 使用，例如：

```html
<button class="psy-btn">Button</button>
<input class="form-input" />
```

Mimosa 已預先設定 CSS 載入行為，在 Vite、Webpack、Rollup 等常見建置工具中，通常不需額外設定即可正常使用。

## 套件建置與發佈

此段落主要是「維護者／開發者」的 build 流程

用途是：1. 產生 npm 發佈檔案 2.產生 docs 需要的 CSS 3.編譯 dist


```bash
npm install
npm run build

建置完成後，會產生 npm 發佈所需的檔案：

- `dist/tokens.css`
- `dist/tokens.json`
- `dist/tailwind.css`
- `dist/tailwind/*`

### 關於 `dist/mimosa.css`

`dist/mimosa.css` 不作為 npm package 的公開樣式檔案

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

```bash
npm run build
node scripts/build-docs.mjs
```

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
