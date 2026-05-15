# Mimosa Design System

Mimosa 是一個以 CSS 為核心的 design system npm package，提供：

- CSS design tokens
- 完整編譯樣式包
- Tailwind v4 bridge
- 可重用的產品介面 primitives

## 安裝

```bash
npm install mimosa-design-system
```

## 公開入口

目前 package 對外提供以下入口：

- `mimosa-design-system`
- `mimosa-design-system/tokens.css`
- `mimosa-design-system/tailwind.css`
- `mimosa-design-system/tailwind/theme.css`
- `mimosa-design-system/tailwind/components.css`
- `mimosa-design-system/tokens.json`

## 使用方式

### 完整樣式包

如果你想直接使用編譯好的完整樣式，可匯入：

```js
import "mimosa-design-system";
```

這會載入：

- `dist/mimosa.css`

### 只使用 tokens

如果你只需要 `--psy-*` CSS custom properties，可匯入：

```js
import "mimosa-design-system/tokens.css";
```

### 搭配 Tailwind v4

如果你的專案使用 Tailwind v4，並希望由 Mimosa tokens 提供主題值，可匯入：

```js
import "mimosa-design-system/tailwind.css";
```

peer dependency：

- `tailwindcss` `^4.0.0`

如需自行組裝，可額外匯入：

```js
import "mimosa-design-system/tailwind/theme.css";
import "mimosa-design-system/tailwind/components.css";
```

### 使用 token JSON

`tokens.json` 是由 `tokens.css` 衍生出的輔助格式，適合用在腳本、文件生成或其他 tooling；主要 token source 仍是 `tokens.css`。

如果你需要在 JavaScript 或 Node 工具中讀取 token，可匯入：

```js
import tokens from "mimosa-design-system/tokens.json";
```

## 建置

在 repository root 執行：

```bash
npm install
npm run build
```

### 本地預覽文件站

```bash
npm run dev:docs
```

- `http://localhost:5173/index.html` — Tailwind 編譯後的 `docs.bundle.css`
- `design-system.html` — 仍使用 `mimosa.css` + `docs.css`（Phase 2 遷移）

此指令會產生：

- `dist/tokens.css`
- `dist/tokens.json`
- `dist/mimosa.css`
- `dist/tailwind.css`
- `dist/tailwind/theme.css`
- `dist/tailwind/base.css`
- `dist/tailwind/components.css`
- `dist/tailwind/flow-page.css`

## 專案結構

```text
src/theme/
  tokens.css
  mimosa.css
  tailwind.css
  tailwind/
    theme.css
    base.css
    components.css
    flow-page.css

dist/
docs/
scripts/
```
