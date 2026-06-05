# 06 Report — Mobile 淺色 Surface 配對錯誤與 Mimosa 聊天 primitive 缺口

**建立日期：** 2026-06-05  
**回報對象：** `mimosa-design-system` 維護者（§4～§6）；Rave Connect 前端（§3、§7）  
**關聯報告：** `03-report-mimosa-mobile-button-layout-issue.md`、`04-report-guest-home-mimosa-visual-hierarchy-contrast.md`、`05-report-mobile-ionic-mimosa-style-integration.md`  
**實測環境：** `npm run start:mobile` → `localhost:58869`；`mimosa-design-system@0.2.8`；Ionic 8 + Angular 20

---

## 1. 摘要

| 項目 | 說明 |
|------|------|
| **使用者回報** | Mobile 多頁「CSS 跑版」：聊天文字看不清、內容窄欄與底欄不一致、訪客首頁按鈕重疊、註冊表單過寬。 |
| **主因（消費端）** | 在 **淺色 elevated surface**（`--psy-surface-card`）上誤用 **深底前景**（`--psy-text-primary`），違反 Mimosa README「surface + on-surface 配對」；聊天頁為 2026-06 新功能，未走設計系統配對表。 |
| **主因（設計系統）** | Token 已有 `--psy-surface-chat-*`，但 **README 未列出聊天列表／氣泡公開 class**；開發者易自建 CSS 並配錯 token。 |
| **主因（wrapper）** | `rave-button` 仍未在 **host** 套用 Mimosa `0.2.8` 建議的 `psy-btn-host`，並排 CTA hard shadow 重疊（延續 report 03）。 |

本專案修復計畫見：`tasks/06-UI-002-12-mobile-css-style-fix-plan.md`。

---

## 2. 截圖現象對照

### 2.1 聊天列表 `/chats`

- 列背景為 **近白色**（`--psy-surface-card` ≈ 88% white mix）。
- 名稱、預覽文字 **幾乎不可見**（實為淺字 `#fff6ff` 系列 `--psy-text-primary` 畫在淺底上）。
- Tab bar 橫跨全瀏覽器寬，列表區塊僅中央窄欄。

### 2.2 聊天室 `/chats/:chatRoomId`

- **內送氣泡**白底 + 白字（同配對錯誤）。
- **外送氣泡**紫底可讀，但與 Mimosa 官方 `--psy-surface-chat-bubble-outgoing` 未對齊。
- 輸入框白底 + 白 placeholder／白字。
- 「傳送」按鈕為 `rave-button` 預設 inline layout，在窄欄中視覺突兀。

### 2.3 訪客首頁 `/`

- `psy-btn` 螢光按鈕有載入 DS。
- Header「註冊／登入」、卡片「想參加／感興趣」**硬陰影互相重疊**（相鄰按鈕間距 + wrapper host 問題，非 DS 未安裝）。
- 「建立活動」底線 ghost 按鈕邊框異常（可能為 `psy-btn-ghost-on-dark` 在窄欄下的 shadow 裁切）。

### 2.4 註冊 `/auth/register`

- 表單橫向拉滿 devtools 視窗（Mobile 頁缺 `auth-page` `max-width` 容器，屬消費端 layout）。
- `form-input` 紫色欄位為 Mimosa 預期；標題「註冊」在深底可讀。

---

## 3. 程式證據（消費端錯誤）

### 3.1 聊天列表 — 錯誤配對

```css
/* apps/mobile/.../chat-list.page.css */
.chat-list__row {
  background: var(--psy-surface-card, rgba(255, 255, 255, 0.06)); /* 實際 token → 淺色 */
  ...
}
.chat-list__name {
  color: var(--psy-text-primary); /* 深底用淺字 ❌ */
}
```

**應改為：** `color: var(--psy-text-on-light)` 或 `var(--psy-surface-card-fg)`。

### 3.2 聊天氣泡 — 同類錯誤

```css
/* apps/mobile/.../chat-room.page.css */
.chat-room__bubble {
  background: var(--psy-surface-card, ...);
  color: var(--psy-text-primary); /* ❌ */
}
```

### 3.3 Mimosa token 對照（`tokens.json` @0.2.8）

| Token | 值語意 |
|-------|--------|
| `--psy-surface-card` | 淺色 elevated 卡面 |
| `--psy-surface-card-fg` | 卡面主文字（深色） |
| `--psy-text-primary` | 深底 hero 主文字（淺色） |
| `--psy-text-on-light` | = `surface-card-fg` |
| `--psy-surface-chat-push-item` | 內送氣泡建議底 |
| `--psy-surface-chat-bubble-outgoing` | 外送氣泡建議底 |
| `--psy-surface-chat-room-item` | 聊天列表列底 |

README § Surface 配對表已說明淺色 card 應繼承 card fg，但 **聊天 feature 未使用 `psy-card` 元件**，開發者手寫 CSS 時未查表。

---

## 4. 請 Mimosa 維護者協助確認（設計系統缺口）

### 4.1 聊天 UI 缺少公開 primitive

Token 存在（`--psy-surface-chat-*`），但 README「常用公開 Class」**沒有**聊天相關条目，例如：

| 建議 class | 用途 |
|------------|------|
| `psy-chat-list-item` | 列表列（背景 + fg 配對鎖定） |
| `psy-chat-bubble-incoming` | 內送氣泡 |
| `psy-chat-bubble-outgoing` | 外送氣泡 |
| `psy-chat-composer` | 輸入區 + on-light 文字 |

**問題：** 消費端能否只依 token 組合，還是應提供上述 class 以免配對錯誤？

### 4.2 淺色 surface 上禁止使用的 token 清單

建議在 README 加醒目區塊：

```text
在 --psy-surface-card / psy-card 上禁止：--psy-text-primary、--psy-text-secondary（深底用）
應使用：--psy-text-on-light、--psy-text-muted-on-light、--psy-surface-card-fg
```

是否有計畫提供 **lint 規則** 或 **dev-only 對比警告**（類似 a11y）？

### 4.3 `psy-btn-host` 與 Angular wrapper

`0.2.8` README 已建議：

```html
<rave-button class="psy-btn-host psy-btn-host-full">...</rave-button>
```

但 `@rave/frontend/ui` 的 `RaveButtonComponent` **未**在 host 綁定 `psy-btn-host`，僅在內層 `<button class="psy-btn">` 加 layout class。

**請確認：** 官方建議是 consumer 手動加在 host，還是 wrapper 應預設 `:host { display: inline-flex; }` + `psy-btn-host`？

### 4.4 並排 neo-brutal 按鈕安全間距

訪客首頁兩顆並排 `psy-btn-secondary` + `psy-btn-primary` 時，8px hard shadow 視覺重疊。

**請確認：** `psy-btn-row` 是否為並排 CTA 的 **唯一** 推薦容器？是否應在 `psy-btn` 上增加 `margin-inline-end` 當相鄰兄弟？

---

## 5. Ionic × Mimosa 邊界（消費端已部分處理）

`mobile-ionic-bridge.css` 已對齊 `ion-content`／`ion-tab-bar` 字色，但 **無法** 修正 feature 內自訂 `.chat-list__row` 的錯誤配對。

建議 Mimosa 文件加一小節 **「Ionic ion-content 內使用自訂淺色區塊」**，提醒勿繼承 `ion-content { --color: text-primary }` 到淺色子元素。

---

## 6. 建議 Mimosa 文件補充（最小）

1. **Chat 章節**（列表 + 氣泡 + composer HTML 範例，使用 chat token）。  
2. **反模式範例**：「白卡 + text-primary」截圖對照。  
3. **Wrapper 範例**：Angular `rave-button` / Web Component host 完整 DOM 範例。  
4. 將 `--psy-surface-chat-*` 列入 Surface 配對表。

---

## 7. Rave Connect 端修復（不需 Mimosa 發版即可做）

| 項目 | 動作 |
|------|------|
| 聊天 CSS | 改 on-light 配對；採 chat token |
| Tab layout | 新增 `.main-app-shell` 統一 max-width + tab padding |
| Auth 頁 | Mobile 加 `.auth-page` 殼 |
| `rave-button` | host 加 `psy-btn-host`；並排區用 `psy-btn-row` |
| 文件 | 更新 `mobile-mimosa-style-guide.md` 禁止清單 |

詳見 task `06-UI-002-12-mobile-css-style-fix-plan.md`。

---

## 8. 驗收建議（修復後）

- [ ] `/chats` 列表文字在未反白狀態下可讀  
- [ ] `/chats/chat_preset_nova` 內送／外送氣泡皆可讀  
- [ ] `/auth/register` 表單 max-width ≈ 28rem 置中  
- [ ] `/` 訪客首頁並排 CTA 無陰影切割  
- [ ] iPhone SE（375px）與桌面 devtools 375px 一致  

---

**維護：** Rave Connect 前端  
**Mimosa 版本：** `0.2.8`（`node_modules/mimosa-design-system`）
