# 10 Report — 我的檔案頁視覺層級與活動評分 UI

**建立日期：** 2026-06-06  
**回報對象：** `mimosa-design-system` 維護者（§5～§6）；Rave Connect 前端（§3、§7）  
**關聯頁面：** `/my/profile`  
**實測環境：** Mobile `localhost`；`mimosa-design-system@0.3.3`

---

## 1. 摘要

| # | 回報 | 主因歸屬 | 修復方向 |
|---|------|----------|----------|
| 1 | 帳號設定按鈕文字色／層級異常 | **消費端 + Ionic bridge**（`a.psy-btn-ghost` 在 `ion-content` 內色票未鎖定） | bridge 補 unlayered 規則；改 `secondary` 導覽 CTA |
| 2 | 讚／倒讚同色 | **消費端**（皆用 primary／secondary 切換） | 讚用 primary／secondary；倒讚一律 `psy-btn-danger`（洋紅） |
| 3 | `Echo Basement · Taipei` 像內文 | **消費端**（venue 與 date 同一 `.history-meta`） | 場館列獨立樣式／字重 |
| 4 | 「你的評分：讚」邏輯冗餘 | **消費端 IA** | 按鈕 `aria-pressed` + 狀態 chip；移除重複文案 |

---

## 2. §1 帳號設定按鈕

### 2.1 現象

- `psy-card` 內 `<a class="psy-btn psy-btn-ghost">帳號設定</a>` 文字偏螢光／淺色，與 card fg 對比不足，不像 card 內 tertiary 導覽。

### 2.2 程式

```html
<a class="psy-btn psy-btn-ghost psy-btn-block" routerLink="/my/settings">帳號設定</a>
```

### 2.3 分析

| 方 | 說明 |
|----|------|
| **Mimosa** | README 淺色 card tertiary 建議 `psy-btn-ghost`；token `--psy-button-ghost-fg: var(--psy-text-on-light)` **理論上為深字**；`overrides.css` 已含 `a.psy-btn` box model |
| **Ionic** | `ion-content { --color: var(--psy-text-primary) }` 為**未分層**規則；子元素若 variant 色未以 unlayered 鎖定，繼承鏈可能使 `<a>` 在部分情境偏深底用色 |
| **消費端** | 帳號設定為**明確導覽 CTA**（非 cancel ghost）；用 `secondary` block 或 on-light 鎖色較符合「可點擊設定入口」語意 |

**結論：** Mimosa token 設計合理；**實際破版為 Ionic × anchor button 疊層 + 語意選錯 variant**。非 DS 缺色，但建議 Mimosa 補「card 內 anchor ghost 範例 + ionic-bridge 片段」。

---

## 3. §2 讚／倒讚配色

### 3.1 現象

- 讚／倒讚未選時皆為黃色 `secondary`；選取時讚為綠、倒讚仍為黃，**無正負對比**。

### 3.2 Mimosa 盤點

| Token / class | 語意 |
|---------------|------|
| `psy-btn-primary` | 正向主行動（萊姆） |
| `psy-btn-secondary` | 次要填色（琥珀） |
| `psy-btn-danger` | 危險／不可逆（**洋紅** `--psy-action-danger-bg`） |

**缺口：** README「常用公開 Class」**未列** `psy-btn-danger`；無 `psy-reaction-up` / `psy-reaction-down` 成對 primitive；`@rave/frontend/ui` `rave-button` 原僅 `primary | secondary | ghost`。

**結論：** 色票已有；**消費端未用 danger** + wrapper 未暴露 danger variant。建議 Mimosa 補「雙向評分」文件範例。

---

## 4. §3 活動歷史場館列

### 4.1 現象

- `venueName · city` 與日期共用 `my-profile__history-meta`（muted small），場館名稱無法與日期區分。

### 4.2 分析

| 方 | 說明 |
|----|------|
| **消費端** | 未拆 venue／date 語意層級 |
| **Mimosa** | 有 `psy-venue-tag`（地點提及）但用於**近期場館 chip**，非歷史卡 subtitle；可選用或自訂 `history-venue` 列 |

**結論：** **消費端 markup/CSS**；Mimosa 可選補「活動歷史卡」範例（標題 + venue 列 + meta 日期）。

---

## 5. §4 評分狀態文案

### 5.1 現象

- 按鈕列下方另有「你的評分：讚」文字，與按鈕選取態**重複**。

### 5.2 業界做法（簡述）

| 來源 | 建議 |
|------|------|
| [UX Stack Exchange — thumbs up/down](https://ux.stackexchange.com/questions/118717/) | 兩顆按鈕同型，**選取態改變樣式**；另一顆保持可點以允許改選 |
| [Cloudscape — collect user feedback](https://cloudscape.design/patterns/general/collect-user-feedback/) | 送出後以**填充圖示**表示已選；簡短感謝，避免長句重複 |
| [Skyscanner Thumb Button](https://www.skyscanner.design/latest/components/thumb-button/web-l6mpWkUm) | `selected` prop + `aria-pressed`；預設灰、選取 primary 色 |

### 5.3 建議 UI（本專案）

- **移除**「你的評分：讚」獨立段落。
- 按鈕加 `aria-pressed`；選取態用 primary（讚）／danger（倒讚）。
- 可選：標題旁小 chip `已讚`／`已倒讚`（`psy-chip` 或語意色 badge），供掃視。

**結論：** **消費端 IA**；Mimosa 可補 `psy-reaction-toggle` 或文件範例（雙按鈕 + aria-pressed）。

---

## 6. 請 Mimosa 維護者協助（Issue 建議）

1. **README** 列入 `psy-btn-danger`；並排 CTA 表加「負向確認／倒讚」列。  
2. **Ionic bridge 章節** 補 `ion-content .psy-card a.psy-btn.psy-btn-ghost` 色票鎖定範例（或官方 `ionic-bridge.css` 片段）。  
3. **Reaction / rating 章節**（可選 primitive）：`psy-reaction-up` / `psy-reaction-down` 或 thumbs 成對範例 + `aria-pressed`。  
4. **活動歷史卡** HTML 範例：title、venue 列、date meta、評分按鈕列。

---

## 7. Rave Connect 修復（2026-06-06）

| 項目 | 動作 |
|------|------|
| 帳號設定 | 改 `psy-btn-secondary psy-btn-block`；bridge 補 card 內 ghost anchor 色 |
| 讚／倒讚 | `rave-button` 加 `danger`；倒讚一律 danger（洋紅），讚選取 primary／未選 secondary |
| 場館列 | `.my-profile__history-venue` 字重／色；與 date meta 分離 |
| 評分文案 | 移除冗餘句；`aria-pressed` + 可選狀態 chip |

---

**狀態：** 報告 + 消費端修復已套用。  
**維護：** Rave Connect 前端
