# Mimosa × Tailwind 整合（逐步進行）

## 原則

1. **Token 唯一來源**：`theme-tokens.css` → `mimosa-design-system/tokens.css`
2. **Tailwind `@theme` 只做映射**：`var(--psy-*)`，不在 config 複製 hex
3. **撰寫順序**：Tailwind utilities 為主 → 不夠再用 `@layer components` 薄 CSS

## 進度

| Step | 範圍 | 狀態 |
|------|------|------|
| 1 | `examples/mimosa-consumer`：Tailwind v4 示範頁 | ✅ |
| 2 | 共用入口 `mimosa-design-system/tailwind.css`（`shared/mimosa-ui/src/`） | ✅ |
| 3 | `design-system.html` + Vite（`examples/design-system-site`） | ✅ |
| 4 | `index.html` 全頁（頂欄、hero、events、matching、cities、feed） | ✅ |
| 5 | `account/` Epic 流程頁（`flow-page.css` 模板） | ✅ |
| 6 | 其餘 Epic（`event/`、`pair/`…）複製 account 模式 | 待做 |

## 本機預覽

```bash
cd mimosa-ui
npm install
npm run dev          # consumer 示範 → :5173
npm run dev:docs     # 設計系統文件 → :5175/design-system.html
npm run dev:mock     # 純靜態 mock（無 Tailwind build）→ :5174
```

## 套件匯入（Step 2）

```js
// Vite + @tailwindcss/vite
import "mimosa-design-system/tailwind.css";
```

來源檔：

- `shared/mimosa-ui/src/tailwind.css` — 入口
- `shared/mimosa-ui/src/tailwind/theme.css` — `@theme` 映射
- `shared/mimosa-ui/src/tailwind/components.css` — `.psy-*` 薄元件

`npm run build` 在 `shared/mimosa-ui` 會複製到 `dist/`。

## 文件站（Step 3）

- `mock-up/.../design-system.entry.js` — 載入 `tailwind.css`
- `design-system.html` 底部 `<script type="module" src="./design-system.entry.js">`
- 仍保留 `design-system.css`（文件中性版面）；與 Tailwind **並存**，之後逐段改寫

## Step 4 建議

1. 挑 `index.html` 一個區塊（如 `.hero`）改 Tailwind class
2. 從 `styles.css` 刪除已遷移規則
3. 重複至子頁；最後評估是否仍需要整包 `mimosa.css`
