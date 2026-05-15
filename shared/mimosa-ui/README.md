# Mimosa Design System

Mimosa is a lightweight UI package built from the current `v16-psychedelic` design system source.

## Install

```bash
npm install mimosa-design-system
```

## Usage

### Import full app styles

```js
import "mimosa-design-system";
```

### Import tokens only

```js
import "mimosa-design-system/tokens.css";
```

### Import documentation styles

```js
import "mimosa-design-system/docs.css";
```

### Use token JSON

```js
import tokens from "mimosa-design-system/tokens.json";
```

## Build package assets

```bash
npm run build
```

This command regenerates:

- `dist/tokens.css`
- `dist/mimosa.css`
- `dist/docs.css`
- `dist/tokens.json`

## Local preview (localhost)

From the **repository root** (npm workspaces):

```bash
npm install
npm run dev
```

- **`npm run dev`** — Vite 開發伺服器載入套件樣式（`examples/mimosa-consumer`），預設 <http://localhost:5173>，並會嘗試自動開啟瀏覽器。
- **`npm run dev:mock`** — 直接預覽 `mock-up/web-home/v16-psychedelic` 靜態稿（`examples/v16-mock-preview`），預設 <http://localhost:5174>。

## Consumer example (local verification)

A minimal consumer app is provided at `examples/mimosa-consumer` for install/import verification.

```bash
# 建議：在 repo 根目錄執行（見上方 Local preview）
npm install
npm run build
```

或僅在範例目錄內建置：

```bash
cd examples/mimosa-consumer
npm install
npm run build
```

Inside `src/main.js`, the example imports:

- `mimosa-design-system`
- `mimosa-design-system/tokens.css`

If `npm run build` succeeds, it confirms the package can be consumed by an external project.

## Versioning policy

Mimosa follows Semantic Versioning (`MAJOR.MINOR.PATCH`):

- **MAJOR**: breaking changes (token rename/removal, deleted exports, incompatible class changes)
- **MINOR**: backward-compatible additions (new tokens, new utility/component styles, new export paths)
- **PATCH**: backward-compatible fixes (bug fixes, typo fixes, docs updates with no API/style contract break)

### Practical release rules

- Do not rename/remove existing public tokens in `dist/tokens.css` in minor/patch releases.
- Keep existing export paths stable:
  - `mimosa-design-system`
  - `mimosa-design-system/tokens.css`
  - `mimosa-design-system/docs.css`
  - `mimosa-design-system/tokens.json`
- If a token/class must be replaced:
  - add new one first,
  - keep old one with deprecation note for at least one minor version,
  - remove in next major release.
