# 07 Report — Mobile Ionic 按鈕 padding、卡內標題與聊天室 shell

**建立日期：** 2026-06-05  
**回報對象：** `mimosa-design-system` 維護者（§4～§6）；Rave Connect 前端（§3、§7）  
**關聯報告：** `03-report-mimosa-mobile-button-layout-issue.md`、`06-report-mobile-surface-pairing-and-mimosa-gaps.md`  
**實測環境：** `npm run start:mobile` → `localhost:58869`；`mimosa-design-system@0.2.8`；Ionic 8 + Angular 20

---

## 1. 摘要

| # | 路由 | 現象 | 主因歸屬 |
|---|------|------|----------|
| 1 | `/events` | 頂欄／卡內 CTA 按鈕文字貼邊 | **消費端 + Ionic**（normalize 蓋掉 `.psy-btn` padding） |
| 2 | `/matching` | 略過／Like 按鈕 padding 過小 | 同上 |
| 3 | `/matching` | 卡內 `<h2>Raven</h2>` 白字不可讀 | **消費端 bridge** 誤用 `ion-content h1–h6 { text-primary }` |
| 4 | `/matching` | 標籤與活動名稱層級不分 | **消費端用法** + **DS 文件缺口**（未示範 chip／kicker 組合） |
| 5 | `/users/:id` | 追蹤／檢舉按鈕 padding | 同 #1 |
| 6 | `/users/:id` | 名稱／區塊標題白字、層級錯 | 同 #3 + 消費端未用 `psy-kicker-on-card` |
| 7–8 | `/chats/*` | 聊天室全寬、無留白、「← 聊天」貼邊 | **消費端 bug**（主分支漏 `main-app-shell`） |

---

## 2. 按鈕 padding（#1、#2、#5）

### 2.1 現象

`rave-button` 內層 `<button class="psy-btn">` 在 Web 正常（`padding: 10px 16px`、`min-height: 48px`），Mobile 上文字幾乎貼住 neo-brutal 邊框。

### 2.2 根因鏈

**Mimosa**（`dist/tailwind/components.css`）正確定義：

```css
@layer components {
  .psy-btn {
    min-height: 48px;
    padding: var(--psy-space-3) var(--psy-space-6); /* 10px 16px */
    border: var(--psy-border-width-block) solid var(--psy-border-strong);
    ...
  }
}
```

**Ionic**（`@ionic/angular/css/normalize.css`）在 Mobile 全域載入且 **無 `@layer`**：

```css
button {
  padding: 0;
  border: 0;
  border-radius: 0;
  ...
}
```

CSS cascade：無 layer 規則優先於 `@layer components`，因此 Ionic 的 `button { padding: 0 }` **打敗** Mimosa `.psy-btn` 的 padding／border。  
先前 `mobile-ionic-bridge.css` 只還原 `font-family`，未還原 box model。

### 2.3 歸屬

| 方 | 責任 |
|----|------|
| Ionic | normalize 為通用 reset，屬預期行為 |
| Mimosa | `.psy-btn` 僅在 `@layer` 內，與 Ionic 併用時易被蓋掉；文件未明確說明 |
| Rave Connect | 應在 bridge 以 **無 layer** 規則還原 `button.psy-btn` box model（已修） |

---

## 3. 卡內標題白字（#3、#6）

### 3.1 現象

配對卡、使用者詳情在淺色 `psy-card` 上，`<h1>`／`<h2>` 顯示為 `--psy-text-primary`（淺色），對比不足。

DevTools 指向：

```css
/* mobile-ionic-bridge.css（修復前） */
ion-content h1, ion-content h2, ... {
  color: var(--psy-text-primary);
}
```

### 3.2 為何 Mimosa `.psy-card > h2` 沒救回來？

Mimosa（`cards.css`）有：

```css
@layer ... {
  .psy-card > :where(h1, h2, ...) {
    color: var(--psy-surface-card-fg);
  }
}
```

但：

1. **Layer 優先序**：bridge 的 `ion-content h2` 無 layer → 打敗 layered card 規則。  
2. **DOM 結構**：配對卡名稱在 `<button class="matching__card-tap"><h2>` 內，**非** `.psy-card` 直接子元素，`> h2` 選擇器不匹配。

### 3.3 歸屬

| 方 | 責任 |
|----|------|
| Rave Connect | 不應對 `ion-content` 內所有標題一刀切；改為深底頁標題白名單 + `.psy-card :is(h1–h6)` 覆寫（已修） |
| Mimosa | 可補 `.psy-card :is(h1–h6)` 後代選擇器（非僅 `>`），並在 Ionic 整合章節提醒 layer 衝突 |

---

## 4. 標籤與活動層級（#4）

### 4.1 現象

`techno · house · acid` 與 `Warehouse Resonance` 皆為一般 `<p>` 串接，無法區分「興趣標籤」與「近期活動」。

### 4.2 Mimosa 已有 primitive

| Class | 用途 |
|-------|------|
| `psy-chip` | 興趣／分類標籤（有底色 padding） |
| `psy-kicker-on-card` | 淺色卡上的區塊小標（uppercase、muted） |

### 4.3 歸屬

| 方 | 責任 |
|----|------|
| Rave Connect | 應使用 `psy-chip` + `psy-kicker-on-card`，勿用 `join(' · ')` 純文字（已修） |
| Mimosa | README 缺 **配對卡／個人頁** 範例 HTML；`psy-chip` 與 `psy-kicker-on-card` 並排用法未文件化 |

---

## 5. 聊天室版面（#7、#8）

### 5.1 現象

`chat-room` 主內容 `<main class="chat-room">` 缺少 `main-app-shell`，導致：

- 無 `max-width: 36rem`、無 `padding: 1rem`
- 「← 聊天」連結貼近視窗左上
- composer／傳送鈕橫向拉滿

`notFound` 分支曾正確使用 `main-app-shell chat-room`，正常房間分支漏加，屬 **消費端不一致**。

### 5.2 歸屬

| 方 | 責任 |
|----|------|
| Rave Connect | 統一 Tab 內頁根節點為 `main-app-shell`（已修） |
| Mimosa | 無需改套件；可選補 chat room layout 範例 |

---

## 6. 請 Mimosa 維護者協助（Issue 建議）

### 6.1 Ionic 整合章節（高優先）

建議 README 新增 **「Ionic + normalize.css」** 小節：

1. 說明 `button { padding: 0 }` 會蓋過 `@layer` 內 `.psy-btn`。  
2. 建議消費端 bridge 範例（還原 `padding`／`border`／`min-height`），或提供 `@layer overrides { .psy-btn { ... } }` 官方片段。  
3. 建議 **不要** 對 `ion-content h1–h6` 全域設 `text-primary`；改列深底頁標題白名單。

### 6.2 按鈕 primitive 與 layer

是否考慮將 `.psy-btn` 核心 box model 改為 **無 layer** 或 `@layer overrides`，避免與常見 CSS reset（Ionic、Tailwind preflight）衝突？

### 6.3 配對／個人頁內容範例

請補最小 HTML：

```html
<section class="psy-card p-6">
  <h2 class="...">顯示名稱</h2>
  <div><!-- psy-chip × N --></div>
  <p class="psy-kicker-on-card">近期活動</p>
  <p>...</p>
  <div class="psy-btn-row">...</div>
</section>
```

並註明 `h2` 可放在可點擊 `<button>` 內時，需用後代選擇器或語意 class，勿依賴 `.psy-card > h2`。

### 6.4 聊天室 layout

非必須發版；可將 `--psy-surface-chat-*` 與 `main-app-shell` 類容器寫入 Chat 章節（延續 report 06 §4.1）。

---

## 7. Rave Connect 已實施修復

| 檔案 | 變更 |
|------|------|
| `shared/frontend/styles/mobile-ionic-bridge.css` | 還原 `button.psy-btn` padding／border；縮小標題色規則；`.psy-card` 內標題 on-light |
| `apps/mobile/.../chat-room.page.html` | 主分支加 `main-app-shell` |
| `apps/mobile/.../matching.page.html` | `psy-chip`、`psy-kicker-on-card`、`psy-btn-row` |
| `apps/mobile/.../user-detail.page.html` | 同上 |
| `apps/mobile/.../events-discovery.page.html` | header／卡內 `psy-btn-row` |
| `docs/dev/mobile-mimosa-style-guide.md` | 補 Ionic normalize／標題規則說明 |

Task：`tasks/06-UI-002-13-mobile-css-followup-padding-headings-chat.md`

---

## 8. 驗收建議

- [ ] `/events` 我的活動／建立活動／登出、想參加／感興趣按鈕內距與 Web 相近  
- [ ] `/matching` 名稱深色可讀；chip 與「近期活動」kicker 可區分  
- [ ] `/users/user_match_1` 標題可讀；區塊標籤為 kicker 樣式  
- [ ] `/chats/chat_preset_nova` 與 `/chats/chat_mock_user_match_2` 左右有 1rem padding、最大寬 36rem  

---

**維護：** Rave Connect 前端  
**Mimosa 版本：** `0.2.8`
