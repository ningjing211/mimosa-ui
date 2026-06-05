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
在 CSS 入口中使用時，`tailwind.css` 是建議的單一入口，內部已載入 `tailwindcss` 與 Mimosa tokens/components：

```css
@import "mimosa-design-system/tailwind.css";
```

在 HTML／JSX 中，可直接搭配 Tailwind utilities 與 Mimosa 元件 class 使用，例如：

```html
<button class="psy-btn psy-btn-primary">Button</button>
<article class="psy-card">
  <p class="psy-kicker">Architecture</p>
  <h2>Mimosa + shared UI wrapper loaded</h2>
  <p>Card content</p>
</article>
<input class="form-input" />
```

## 視覺邏輯

Mimosa 使用「surface + on-surface」的配對概念：背景 surface 與文字 foreground 必須成組使用，避免在淺色卡片上套到深色頁面的淡色文字。

- 深色頁面：使用 `psy-page-bg` 或 `psy-hero-gradient`，標題用 `--psy-text-primary`；說明／分頁／tertiary 用下方 on-dark primitive。
- 淺色 elevated surface：使用 `psy-card`、`card`、`empty-state`，文字會自動配到 `--psy-surface-card-fg` / `--psy-surface-card-fg-muted`。
- Kicker / eyebrow：淺底 `psy-kicker-on-light` / `psy-kicker-on-card`；深底短標用 `psy-kicker-on-dark`（uppercase）。**長句說明**請用 `psy-lead-on-dark`，不要用 kicker。
- Status / badge：不要只靠顏色傳達狀態，請保留文字 label。`empty-state__status-item` 會提供高對比文字、外框與膠囊背景。
- **禁止** 在 `color-scheme: dark` 且深紫 hero 背景上硬編碼 `#555`、`#666`、`#ccc` 等淺色頁灰字；請改用 Mimosa on-dark class 或 `--psy-text-*-on-dark` token。
- **禁止** 在 `--psy-surface-card` / `psy-card` / `psy-chat-*` 等 **淺色 elevated** 區塊上使用 `--psy-text-primary`、`--psy-text-secondary`（那是深底 hero 用淺字）。應使用 `--psy-text-on-light`、`--psy-surface-card-fg`、`--psy-text-muted-on-light`。

## 常用公開 Class

| 元件 | Class |
|------|-------|
| Button | `psy-btn` |
| Button variants | `psy-btn-primary` / `psy-btn-secondary` / `psy-btn-ghost` / `psy-btn-danger` |
| Button BEM aliases | `psy-btn--primary` / `psy-btn--secondary` / `psy-btn--ghost` / `psy-btn--danger` |
| Button layout | `psy-btn-full` / `psy-btn-block` / `psy-btn-center` / `psy-btn-cta` / `psy-btn-mobile` |
| Button wrapper | `psy-btn-row` / `psy-btn-row-center` / `psy-btn-row-full` / `psy-btn-host` |
| Card | `psy-card` |
| Kicker | `psy-kicker` / `psy-kicker-on-light` / `psy-kicker-on-card` / `psy-kicker-on-dark` |
| 深底內文 | `psy-lead-on-dark` / `psy-text-body-on-dark` |
| 深底 meta | `psy-text-meta-on-dark`（如 `1 / 3`） |
| 深底連結 | `psy-link-on-dark` |
| 深底 tertiary 按鈕 | `psy-btn-ghost-on-dark` |
| 深底 icon 控制 | `psy-icon-btn-on-dark`（輪播箭頭等） |
| 深底輪播 | `carousel--on-dark` / `carousel__meta` / `psy-carousel-controls` |
| 深底分頁 alias | `psy-pagination-on-dark`（同 `carousel__meta`） |
| 頁面內容殼 | `psy-page-shell` / `psy-guest-home-shell`（max-width 32rem 置中） |
| Auth 頁殼 | `psy-auth-page-shell`（max-width 28rem 置中） |
| Tab 主殼 | `psy-main-app-shell`（列表／聊天與 tab bar 同寬節奏） |
| Chat 列表 | `psy-chat-list` / `psy-chat-list-item` |
| Chat 氣泡 | `psy-chat-bubble-incoming` / `psy-chat-bubble-outgoing` |
| Chat 輸入 | `psy-chat-composer` + `form-input` |
| Chat 房殼 | `psy-chat-room-shell`（max-width 36rem） |
| 卡內標題 | `psy-card-title`（可放在 `<button>` 內） |
| 標籤列 | `psy-chip-list` + `psy-chip` |
| 場館提及 | `psy-venue-list` + `psy-venue-tag`（細框 + location icon，非填色 chip） |
| 活動歷史場館列 | `psy-history-venue`（字重高於 date meta） |
| Card meta 日期 | `psy-meta-on-card` |
| 讚／倒讚 | `psy-reaction-row` + `psy-reaction-up` / `psy-reaction-down` + `aria-pressed` |
| 評分狀態 chip | `psy-chip--reaction-up` / `psy-chip--reaction-down` |
| Ionic bridge（Mobile） | `tailwind/ionic-bridge.css`（Mimosa 之後載入） |
| Structured card | `card` / `card__header` / `card__body` / `card__footer` |
| Form input | `form-input` |
| Checkbox / radio label | `form-choice` / `form-choice-list` |
| Checkbox on light card | `form-choice--on-light` + `psy-checkbox psy-checkbox--on-light` |
| Empty state | `empty-state` / `empty-state__title` / `empty-state__text` / `empty-state__actions` |
| Empty state status | `empty-state__status-list` / `empty-state__status-item` |

## Surface 配對表

| Surface | 標題 | 說明／helper | Meta（1/3） | Tertiary 動作 | 主要按鈕 |
|---------|------|--------------|-------------|---------------|----------|
| 深底 hero（`psy-page-bg`） | `--psy-text-primary` / 繼承 body | `psy-lead-on-dark` | `psy-text-meta-on-dark` | `psy-btn-ghost-on-dark` 或 `psy-link-on-dark` | `psy-btn-primary` |
| 淺色 card（`psy-card`） | 繼承 card fg | 內文 muted | `psy-meta-on-card` | `psy-btn-ghost` | `psy-btn-primary` |
| card 內導覽 CTA | — | — | — | — | `psy-btn-secondary psy-btn-block` |
| 負向確認／倒讚 | — | — | — | — | `psy-btn-danger` 或 `psy-reaction-down` |
| 讚（已選） | — | — | — | — | `psy-reaction-up[aria-pressed="true"]`（萊姆） |
| 設定／同意勾選（card 內） | `form-choice--on-light` 標籤 | — | — | — | `psy-checkbox--on-light` 萊姆勾選 |
| 聊天列表／氣泡 | `psy-chat-list-item__name` | `psy-chat-list-item__preview` | — | `psy-btn` in composer | `psy-btn-primary` |
| 深底 + 螢光 accent | `psy-kicker-on-dark` | `psy-lead-on-dark` | `psy-meta-on-dark` | `psy-btn-ghost-on-dark` | `psy-btn-primary` |

## 深底 Hero 頁（訪客著陸／Carousel）

```html
<main class="psy-hero-gradient">
  <header>
    <h1>Rave Connect</h1>
    <button class="psy-btn psy-btn-secondary">註冊</button>
    <button class="psy-btn psy-btn-primary">登入</button>
  </header>

  <p class="psy-lead-on-dark">
    探索電音活動 — 左右切換預覽，互動需先註冊或登入
  </p>

  <article class="psy-card">…</article>

  <section class="carousel carousel--on-dark">
    <article class="psy-card">…</article>
    <div class="psy-carousel-controls">
      <button type="button" class="psy-icon-btn-on-dark" aria-label="上一則">‹</button>
      <p class="carousel__meta">1 / 3</p>
      <button type="button" class="psy-icon-btn-on-dark" aria-label="下一則">›</button>
    </div>
  </section>

  <button type="button" class="psy-btn psy-btn-ghost-on-dark">建立活動</button>
</main>
```

全站若已設定：

```css
body {
  background: var(--psy-gradient-hero-panel), var(--psy-surface-page-deep);
  color: var(--psy-text-primary);
}
```

則 `<h1>` 可繼承主色；**勿**再對 `.lead` 寫 `color: #555`。`psy-kicker-on-dark` 會 `text-transform: uppercase`，不適合繁中長句說明。

## Angular + Ionic Mobile 整合

Ionic 預設 typography／`ion-content` 背景會與 Mimosa 深底 hero 衝突。Mobile 請在 **Mimosa 之後** 載入 bridge：

```css
/* apps/mobile/src/styles.css（示意） */
@import "@ionic/angular/css/core.css";
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
@import "mimosa-design-system/tailwind.css";
@import "mimosa-design-system/tailwind/ionic-bridge.css";
```

訪客首頁請用頁面殼收斂寬度（勿只寫子元素 CSS、省略根容器）：

```html
<ion-content>
  <div class="psy-page-shell psy-hero-gradient">
    <header class="guest-home__header">…</header>
    <p class="psy-lead-on-dark">…</p>
    <section class="carousel carousel--on-dark">…</section>
    <button type="button" class="psy-btn psy-btn-ghost-on-dark">建立活動</button>
  </div>
</ion-content>
```

`ionic-bridge.css` 會：將 `ion-app`／`ion-content` 對齊 `--psy-text-primary`、保護 `.psy-btn` 不被 Ionic reset 覆寫、並設定 `ion-tab-bar` token。

在 `ion-content` 內若自訂 **淺色** 列表／氣泡，請用 `psy-chat-*` 或 `psy-card`，**勿**對淺底元素設 `color: var(--psy-text-primary)`（會變成淺字在淺底）。

`ion-content` 的 `--color` 為未分層規則，`<a class="psy-btn psy-btn-ghost">` 在 `psy-card` 內可能繼承深底淺字。bridge 已以 **unlayered** 規則鎖定 card 內 `a.psy-btn` variant 色票；帳號設定等**明確導覽 CTA** 仍建議用 `psy-btn-secondary psy-btn-block`，勿用 ghost。

### Ionic + `normalize.css`（按鈕 padding）

Ionic 的 `button { padding: 0; border: 0 }` **沒有** `@layer`，會蓋過 Mimosa `@layer components` 內的 `.psy-btn`。

Mimosa 主入口 `tailwind.css` 末尾已載入 **`overrides.css`**（無 layer）還原 `button.psy-btn` 的 padding／border／min-height。Mobile 仍建議載入 `ionic-bridge.css`，且 **不要** 對 `ion-content h1–h6` 全域設 `text-primary`；深底標題請限縮在 `psy-page-on-dark`／`psy-hero-page` 等白名單容器。

## 配對卡／個人頁（淺色 card）

```html
<section class="psy-card">
  <button type="button" class="matching__card-tap">
    <h2 class="psy-card-title">Raven</h2>
  </button>

  <ul class="psy-chip-list" aria-label="興趣標籤">
    <li><span class="psy-chip">techno</span></li>
    <li><span class="psy-chip">house</span></li>
    <li><span class="psy-chip">acid</span></li>
  </ul>

  <p class="psy-kicker-on-card">近期活動</p>
  <ul class="psy-venue-list" aria-label="近期場館">
    <li class="psy-venue-tag">
      <svg class="psy-venue-tag__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
      <span class="psy-venue-tag__name">Warehouse Resonance</span>
    </li>
  </ul>

  <div class="psy-btn-row">
    <button type="button" class="psy-btn">略過</button>
    <button type="button" class="psy-btn psy-btn-primary">Like</button>
  </div>
</section>
```

`h2` 若在可點擊 `<button>` 內，請用 `psy-card-title`；勿依賴 `.psy-card > h2` 直接子選擇器。

興趣用填色 `psy-chip`；使用者填寫的場館／地點名稱用細框 `psy-venue-tag`（左側 map-pin icon），勿混用 chip 或 `well` 列表。

## Checkbox／設定頁（淺色 card）

原生 `<input type="checkbox">` 未設 `accent-color` 時，瀏覽器預設勾選色多為系統藍，與 `psy-btn-primary` 萊姆主行動色不一致。

**最低限度**（深紫頁）：`form-choice` 會套用 `accent-color: lime`。

**建議**（`psy-card` 設定區）：`form-choice--on-light` + `psy-checkbox psy-checkbox--on-light`（brutal 邊框 + 萊姆勾選，標籤用 card fg）。

```html
<section class="psy-card">
  <label class="form-choice form-choice--on-light">
    <input type="checkbox" class="psy-checkbox psy-checkbox--on-light" />
    <span>接受其他使用者邀請我參加活動</span>
  </label>
</section>
```

註冊 18+ 確認等同理；多選請用 `form-choice-list` 包 `<li>`。

```html
<ul class="form-choice-list">
  <li>
    <label class="form-choice form-choice--on-light">
      <input type="checkbox" class="psy-checkbox psy-checkbox--on-light" />
      <span>我已年滿 18 歲</span>
    </label>
  </li>
</ul>
```

## 我的檔案／活動歷史卡（淺色 card）

場館列與日期 meta 請分開語意：`psy-history-venue` 字重高於 `psy-meta-on-card`。評分用 `aria-pressed` 表選取態，**勿**在按鈕下方重複「你的評分：讚」文案；可選標題旁狀態 chip。

```html
<section class="psy-card">
  <a class="psy-btn psy-btn-secondary psy-btn-block" href="/my/settings">帳號設定</a>

  <article>
    <h3 class="psy-card-title">
      Warehouse Resonance
      <span class="psy-chip psy-chip--reaction-up">已讚</span>
    </h3>
    <p class="psy-history-venue">Echo Basement · Taipei</p>
    <p class="psy-meta-on-card">2026-05-18</p>

    <div class="psy-reaction-row" role="group" aria-label="活動評分">
      <button type="button" class="psy-btn psy-reaction-up" aria-pressed="true">讚</button>
      <button type="button" class="psy-btn psy-reaction-down" aria-pressed="false">倒讚</button>
    </div>
  </article>
</section>
```

- **讚**：未選為 secondary（預設 `.psy-btn`）；`aria-pressed="true"` 時為萊姆 primary。
- **倒讚**：一律 `psy-reaction-down`（洋紅 danger）；選取時以 inset ring 強調，無需重複文字說明。

## Chat（列表／氣泡／輸入）

```html
<ul class="psy-chat-list">
  <li>
    <a class="psy-chat-list-item" href="/chats/nova">
      <p class="psy-chat-list-item__name">Nova</p>
      <p class="psy-chat-list-item__preview">今晚 warehouse 見？</p>
    </a>
  </li>
</ul>

<div class="psy-chat-thread">
  <p class="psy-chat-bubble-incoming">內送訊息</p>
  <p class="psy-chat-bubble-outgoing">外送訊息</p>
</div>

<form class="psy-chat-composer">
  <input class="form-input" placeholder="輸入訊息…" />
  <button type="submit" class="psy-btn psy-btn-primary">傳送</button>
</form>
```

聊天室頁請包在 `psy-chat-room-shell`（或 `psy-main-app-shell`）內，避免 composer 與返回連結貼死視窗邊緣：

```html
<ion-content>
  <main class="psy-chat-room-shell">
    <a class="psy-link-on-dark" href="/chats">← 聊天</a>
    <!-- thread + psy-chat-composer -->
  </main>
</ion-content>
```

`psy-chat-*` 已鎖定 `--psy-surface-chat-*` 與 `--psy-surface-card-fg`，避免「白卡 + text-primary」反模式。

## 反模式（勿這樣寫）

```css
/* ❌ 淺色卡面 + 深底主色字 → 幾乎看不見 */
.chat-row {
  background: var(--psy-surface-card);
  color: var(--psy-text-primary);
}

/* ✅ 使用 chat primitive 或 on-light token */
.chat-row {
  background: var(--psy-surface-card);
  color: var(--psy-surface-card-fg);
}
```

## Angular wrapper（`rave-button`）

Mimosa 樣式在內層 `<button class="psy-btn">`，**host 也需 layout contract**：

```html
<!-- 並排 CTA：用 psy-btn-row 避免 hard shadow 重疊 -->
<div class="psy-btn-row">
  <rave-button class="psy-btn-host">註冊</rave-button>
  <rave-button class="psy-btn-host">登入</rave-button>
</div>

<!-- 滿版 CTA -->
<rave-button class="psy-btn-host psy-btn-host-full">Start smoke check</rave-button>
```

Wrapper 元件建議在 `:host` 預設 `display: inline-flex`，並讓 consumer 可傳入 `psy-btn-host` class。

## 深色頁面中的卡片

```html
<main class="psy-page-bg">
  <article class="psy-card">
    <p class="psy-kicker">Architecture</p>
    <h2>Mimosa + shared UI wrapper loaded</h2>
    <p>Card descriptions remain readable on the light elevated surface.</p>
    <button class="psy-btn psy-btn-primary">Primary action</button>
  </article>
</main>
```

`psy-card` 是自包含的公開卡片 primitive：它包含背景、邊框、陰影、padding 與文字色。若需要 header/body/footer 結構，使用 `card` 系列 class。

## Button Layout

`psy-btn` 預設只負責 button skin 與 fit-content 行為，適合放在 card、form stack、toolbar 或 button group 中。當 button 獨立放在 mobile page grid 裡，請加上明確 layout class，避免 CTA 看起來貼邊或與上下 block 節奏不一致。

Card / form 內按鈕：

```html
<article class="psy-card">
  <p class="psy-kicker-on-card">Form smoke</p>
  <input class="form-input" placeholder="event, user, case..." />
  <button class="psy-btn psy-btn-primary">Run smoke check</button>
</article>
```

Standalone mobile CTA：

```html
<button class="psy-btn psy-btn-primary psy-btn-cta psy-btn-mobile">
  Start smoke check
</button>
```

若 CTA 外層是 wrapper / custom element，建議讓 host 有 layout contract：

```html
<rave-button class="psy-btn-host psy-btn-host-full">
  Start smoke check
</rave-button>
```

Wrapper 也可以把 layout class 傳給內層 button：

```html
<button class="psy-btn psy-btn-primary psy-btn-full psy-btn-mobile">
  Start smoke check
</button>
```

如果需要額外保留 neo-brutal shadow 的安全空間，可以用 row 容器：

```html
<div class="psy-btn-row psy-btn-row-full">
  <button class="psy-btn psy-btn-primary psy-btn-mobile">Start smoke check</button>
</div>
```

建議選擇：

- `psy-btn-cta psy-btn-mobile`：獨立主要 CTA，mobile 上貼齊 block rhythm。
- `psy-btn-full`：在表單、modal、bottom sheet 等 contained space 內滿版。
- `psy-btn-center`：次要或較短 action，需要置中但不滿版。

## Empty State

```html
<div class="empty-state">
  <p class="empty-state__title">Mobile index ready</p>
  <p class="empty-state__text">
    Mobile build, Ionic shell, and Capacitor output are ready to verify.
  </p>
  <ul class="empty-state__status-list">
    <li class="empty-state__status-item">Mobile build ready</li>
    <li class="empty-state__status-item">Ionic shell ready</li>
    <li class="empty-state__status-item">Capacitor output ready</li>
  </ul>
</div>
```

`empty-state` 預設是淺色 elevated surface，內文、標題與 status item 都使用同一組可讀 foreground token。若在 slot 中混用 Tailwind text utility，請優先確認該 utility 與目前 surface 的對比。

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
