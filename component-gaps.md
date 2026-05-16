# 元件缺口清單 · Component Gaps

> 依據 `design-system.html` 與 `src/theme/tailwind/` 交叉比對。  
> **狀態：2026-05-16 已補齊**（Tailwind 組版 + raw CSS 皮膚 + 文件章節）。

---

## 總覽

| # | 元件 | 原始碼 | 文件 | 狀態 |
|---|------|--------|------|------|
| 1 | Tooltip | `navigation-ui.css` | `#nav-ui-tooltip` | ✅ |
| 2 | Chip / Tag | `components.css`、`flow-page.css` | `#components-chips` | ✅ |
| 3 | Empty State | `feedback.css` | `#feedback-empty-state` | ✅ |
| 4 | Stepper | `data-display.css` + `--psy-step-*` | `#extended-stepper` | ✅ |
| 5 | Popover | `overlays.css` + `--psy-popover-*` | `#overlays-popover` | ✅ |
| 6 | Combobox | `forms-extended.css` + `--psy-combobox-*` | `#extended-combobox` | ✅ |
| 7 | Divider | `.psy-divider`、`.divider` | `#nav-ui-divider`、`#spacing-divider` | ✅ |
| 8 | Notification Center | `navigation-ui.css` `.notification-list` | `#overlays-notification` | ✅ |
| 9 | Carousel | `data-display.css` + `--psy-carousel-*` | `#extended-carousel` | ✅ |

---

## 架構原則（實作方式）

1. **`tokens.css`**：`--psy-*` 為唯一色票／尺寸來源。  
2. **Tailwind v4**：HTML 用 utility 做版面（`flex`、`gap-psy-*`、`max-w-*` 等）。  
3. **Raw CSS partials**（`@layer components`）：產品皮膚與互動態（`.stepper`、`.combobox`、`.empty-state` 等）。  
4. **Host App**：匯入 `tailwind.css` 自行編譯；靜態文件／Pages 用已編譯 `dist/mimosa.css`。

---

## 各項摘要

### Tooltip
- Class：`.tooltip`、`.tooltip__content`；方向 `tooltip--bottom|left|right`；文件截圖 `tooltip--static`。
- A11y：`role="tooltip"`、`aria-describedby`。

### Chip / Tag
- `.psy-chip`、`.psy-flow-chip`、`.psy-flow-chip--selected`；與 `.label` 區分見 `#components-chips`。

### Empty State
- `.empty-state` 三變體（純文字／圖示／行動）；表格內空態用 `.data-table__empty`。

### Stepper / Popover / Combobox / Carousel
- Token + raw CSS 已就緒；鍵盤／開關邏輯由 host JS。

### Divider / Notification
- `.psy-divider`（通用）、`.divider`（語意區塊）；通知列整合於 Drawer 範本。

---

## 仍屬文件層（非元件 CSS）

| 項目 | 說明 |
|------|------|
| Changelog | 版本差異紀錄 |
| 遷移指引 | Token 舊→新對照 |
| Dark mode | 切換機制說明 |
