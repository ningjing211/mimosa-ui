# 08 Report — 配對卡／個人頁「近期活動」視覺層級不足

**建立日期：** 2026-06-05  
**最後修訂：** 2026-06-05（venue tag + location icon 方案）  
**回報對象：** `mimosa-design-system` 維護者（§4～§5）；Rave Connect 前端（§3、§6～§7）  
**關聯報告：** `07-report-mobile-ionic-button-padding-card-headings-chat-shell.md`  
**實測頁面：** `/matching`、`/users/user_match_2`（`mimosa-design-system@0.3.1`）

---

## 1. 摘要

| 項目 | 說明 |
|------|------|
| **使用者回報** | 「近期活動」與場館名稱（如 Warehouse Resonance）看起來像純文字，難與 `psy-chip` 區分。 |
| **資料語意** | `recentEvents` 為使用者填寫的**場館／地點名稱**（club、bar、warehouse），不是活動探索卡、也不是可點選選單。 |
| **收斂方向** | 緊湊 **venue tag**：細框 + 左側 **location icon** + 場館名（類設計系統 medium default chip，但語意為地點）。 |
| **主因（設計系統）** | Mimosa 有 `psy-chip`（興趣）但缺「場館提及 tag」primitive 與 icon 規範。 |

---

## 2. 視覺語意對照

| 內容 | 例子 | 視覺 | 不應像 |
|------|------|------|--------|
| 音樂興趣 | trance、house | `psy-chip` 填色膠囊 | — |
| 近期場館 | Sunrise Terrace | `profile-venue-tag`：細框、pin icon、small 字 | 選單列、活動大卡、填色 chip |
| 成就 placeholder | MVP：徽章… | kicker + muted 小字 | well 外殼 |

---

## 3. 迭代教訓

| 嘗試 | 問題 |
|------|------|
| kicker + 裸 `<p>` join | 太像純文字 |
| `well` + 全寬 bordered 列項 + ♪ | 像選單／選項，過重 |
| kicker + `·` 前導文字列 | 層級仍偏弱，缺「地點」辨識 |
| **venue tag + location icon** ✅ | 緊湊、可與 chip 區分、符合場館語意 |

---

## 4. Mimosa 0.3.1 盤點

### 4.1 現有 primitive

| Class | 適用性 |
|-------|--------|
| `psy-chip` | ❌ 填色興趣標籤，無 icon 槽，易與場館混淆 |
| `psy-kicker-on-card` | ✅ 區塊 eyebrow「近期活動」 |
| `well` / `psy-chat-list-item` | ❌ 過重或互動列表語意 |

### 4.2 建議 Mimosa 補充

| 建議 class | 用途 |
|------------|------|
| `psy-venue-tag` | 細框 inline tag：`__icon` + `__name` |
| `psy-venue-list` | flex-wrap 容器 |
| 文件 | 配對卡範例：chip（興趣）vs venue-tag（地點）並列對照 |

```html
<!-- 建議 Mimosa 範例 -->
<ul class="psy-venue-list">
  <li class="psy-venue-tag">
    <svg class="psy-venue-tag__icon" aria-hidden="true">…</svg>
    <span class="psy-venue-tag__name">Warehouse Resonance</span>
  </li>
</ul>
```

---

## 5. Rave Connect 目前實作

| 項目 | 內容 |
|------|------|
| 樣式 | `shared/frontend/styles/profile-recent-events.css` |
| 結構 | `profile-section` → `psy-kicker-on-card` → `profile-venue-list` → `profile-venue-tag` |
| Icon | inline SVG map-pin（`stroke`，`currentColor`） |
| 頁面 | `matching.page.html`、`user-detail.page.html` |

與參考 UI（icon + 文字、細框、緊湊 padding）對齊；左側為地點 pin，非 rocket／音樂符號。

---

## 6. 驗收建議

- [ ] 場館 tag 有細框 + location icon，體積小於活動卡、不像選單列  
- [ ] 與上方 `psy-chip` 一眼可區分（outline tag vs 填色 chip）  
- [ ] 多筆場館可 flex-wrap 排列  
- [ ] 成就區維持 kicker + muted meta，無 well  

---

**維護：** Rave Connect 前端  
**Mimosa 版本：** `0.3.1`
