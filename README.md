# Mimosa Design System

Mimosa 是以 **Tailwind v4 + CSS tokens** 為核心的 design system npm package，提供：

- `--psy-*` design tokens（唯一色票來源）
- Tailwind `@theme` 映射與 utility 組版
- `.psy-*` 產品元件（`@layer components`）
- Legacy 完整 raw 包（`mimosa.css`，逐步瘦身中）

## 安裝

```bash
npm install mimosa-design-system
```

Tailwind v4 專案需同時安裝 peer dependency：

```bash
npm install tailwindcss@^4
```

## 公開入口

| 入口 | 說明 |
|------|------|
| `mimosa-design-system` / `tailwind.css` | **建議**：tokens + Tailwind + theme + components |
| `tokens.css` | 僅 `--psy-*` 變數 |
| `tailwind/theme.css` 等 partials | 自行組裝 |
| `mimosa.css` / `legacy.css` | Legacy 完整 raw 樣式包 |
| `tokens.json` | 由 `tokens.css` 衍生的 tooling 格式 |

## 使用方式

### 搭配 Tailwind v4（建議）

在 host app 的 CSS 入口（Vite + `@tailwindcss/vite` 或 CLI）匯入：

```js
import "mimosa-design-system/tailwind.css";
```

或等同的預設入口：

```js
import "mimosa-design-system";
```

這會載入 `tokens.css`、`tailwindcss`、以及 `theme` / `base` / `components` / `flow-page` partials。請在專案中設定 Tailwind v4 建置（peer：`tailwindcss@^4`）。

自行組裝範例：

```js
import "mimosa-design-system/tokens.css";
import "tailwindcss";
import "mimosa-design-system/tailwind/theme.css";
import "mimosa-design-system/tailwind/components.css";
```

### 只使用 tokens

非 Tailwind 專案或靜態頁只需變數時：

```js
import "mimosa-design-system/tokens.css";
```

### Legacy 完整樣式包

既有專案若依賴 `.button`、`.form-*`、`.alert` 等 **raw class**（非 `.psy-*`），可暫用：

```js
import "mimosa-design-system/mimosa.css";
// 或
import "mimosa-design-system/legacy.css";
```

新專案請優先改用 `tailwind.css` + `.psy-*` utility／components，不建議新接 `mimosa.css`。

### 使用 token JSON

`tokens.json` 由 `tokens.css` 產生，供腳本或文件工具使用；**主要 token 來源仍是 `tokens.css`**。

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

- `http://localhost:5173/` — 靜態文件由 `docs.bundle.css`（Tailwind 編譯產物）提供樣式

`npm run build` 會產生：

- `dist/tokens.css` / `dist/tokens.json`
- `dist/tailwind.css` 與 `dist/tailwind/*`
- `dist/mimosa.css`（legacy）

## 專案結構

```text
src/theme/
  tokens.css              # --psy-* 唯一真相
  tailwind.css            # Tailwind 入口（對外預設）
  tailwind/
    theme.css             # @theme 映射
    components.css        # .psy-* 薄元件
    product.css           # .alert / .form-* / .search-bar（raw 疊加）
    chrome.css            # header / footer / table / accordion…
    flow-page.css         # 流程頁 .psy-flow-*
    legacy-aliases.css    # .button / .chip 舊名（僅 mimosa 包）
  mimosa.css              # legacy 入口（@import 上列層，無 utility）

docs/                     # 靜態文件站（docs.bundle.css 為 build 產物）
scripts/
dist/                     # npm 發佈內容
```

更完整的架構快照與還原基準見 `docs/ARCHITECTURE-SNAPSHOT.md`。
