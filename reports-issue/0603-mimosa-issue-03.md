# 03 Report - Mimosa Mobile Button Layout Issue

**建立日期：** 2026-06-01  
**回報目的：** 提供給 `mimosa-design-system` 維護者與後續 AI agent，說明 `mimosa-design-system@0.2.6` 在 Web smoke 頁按鈕顯示正常，但 Mobile smoke 頁按鈕仍有版面配置不自然、與周邊 block 對齊邏輯不一致的問題。

## 背景

本專案已依據前兩份 report 升級與調整：

- `mimosa-design-system` 已升級至 `0.2.6`。
- 樣式入口已依 README 改成單一入口：

  ```css
  @import "mimosa-design-system/tailwind.css";
  ```

- Card kicker 已改用 `psy-kicker-on-card`。
- EmptyState status items 已改用 `empty-state__status-list` / `empty-state__status-item`。

目前整體 UI 已比前一版更接近可用狀態，Web smoke 頁也看起來正常。不過 Mobile smoke 頁的主要 CTA button 仍然有 layout / alignment 問題。

## 測試環境

```text
Web URL: http://localhost:4200/
Mobile URL: http://localhost:49685/
Framework:
  - Angular 20
  - Ionic 8
  - Tailwind CSS 4
  - Capacitor 8
Design System:
  - mimosa-design-system@0.2.6
```

## 截圖比較

使用者提供兩張截圖：

- Web smoke page：按鈕位於 `Form smoke` card 內，顯示正常。
- Mobile smoke page：`Start smoke check` 按鈕位於 card 與 EmptyState 之間，顯示不自然。

## Web 正常案例

Web 頁面中，按鈕位於卡片內的表單 stack：

```html
<rave-card>
  <form class="card-stack">
    <p class="psy-kicker-on-card">Form smoke</p>
    <rave-input label="Search keyword" placeholder="event, user, case..." />
    <rave-button>Run smoke check</rave-button>
  </form>
</rave-card>
```

視覺上：

- Button 與 input 同屬一個 card surface。
- Button 有明確容器邊界與上下文。
- Button 的 hard shadow、border、lime background 與 card 形成可理解的 neo-brutalism 視覺。
- Button 不會看起來像從 layout 中「跑出去」。

## Mobile 異常案例

Mobile 頁面中，按鈕是直接放在 page grid 裡，位於 Card 與 EmptyState 中間：

```html
<rave-card>
  ...
</rave-card>

<rave-button>Start smoke check</rave-button>

<rave-empty-state ...>
  ...
</rave-empty-state>
```

視覺上：

- Button 貼在左側，沒有像 Card / EmptyState 一樣形成穩定的 block rhythm。
- Button 的外框與陰影在 mobile narrow viewport 中顯得突兀。
- Button 沒有明確說明自己應該是 inline action、full-width action、還是 fit-content action。
- 與上下方 block 的對齊邏輯不同：Card / EmptyState 是完整 block，Button 是小型 inline block，導致視覺節奏中斷。

## 目前程式碼

Button wrapper：

```ts
@Component({
  selector: 'rave-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="psy-btn"
      [class.psy-btn-primary]="variant === 'primary'"
      [class.psy-btn-secondary]="variant === 'secondary'"
      [class.psy-btn-ghost]="variant === 'ghost'"
      [disabled]="disabled || loading"
    >
      <ng-content />
    </button>
  `
})
export class RaveButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
}
```

Mimosa button class 目前只提供 skin / component visual：

```html
<button class="psy-btn psy-btn-primary">Start smoke check</button>
```

但是在 mobile layout 裡，缺少一個明確的 layout contract，例如：

- block CTA
- full-width CTA
- centered CTA
- fit-content CTA
- mobile-safe shadow offset

## 可能原因分析

### 1. `psy-btn` 同時被當作 component skin 與 layout primitive 使用

`psy-btn` 定義了 button 視覺，例如 background、border、shadow、padding、min-height。但在實際 App 中，button 也需要 layout 語意。

Web 中按鈕剛好被放在 card form stack 裡，因此 layout 由 card / form context 補足。Mobile 中按鈕獨立放在 page grid 裡，缺少外部容器補足，因此問題被放大。

### 2. Mobile CTA 缺少官方推薦 class

對 mobile app 來說，常見 CTA 通常需要其中一種明確行為：

- 滿版寬度：適合主要 action。
- 置中但保留最小寬度：適合次要 action。
- 貼齊卡片內容寬度：適合與上方 card 同組。

目前 Mimosa README 有 button class，但沒有 mobile CTA placement guidance。

### 3. Angular wrapper host 沒有 layout contract

`<rave-button>` 是 Angular custom element selector。實際 DOM 結構會是：

```html
<rave-button>
  <button class="psy-btn psy-btn-primary">Start smoke check</button>
</rave-button>
```

`psy-btn` 套在內層 button 上，但外層 `rave-button` host 本身沒有 display / width / alignment 定義。在 CSS grid layout 中，host 與內層 button 的寬度/對齊可能不直覺，尤其在 mobile narrow viewport 更明顯。

### 4. Button hard shadow 在窄版 viewport 中需要安全邊界

Mimosa 的 button 採 neo-brutalism hard shadow。這在 Web card 中看起來正常，但在 Mobile 獨立 CTA 中，如果 spacing 太小或 button 太靠左，shadow 會讓元件看起來像沒有對齊或跑版。

## 建議 Mimosa 官方確認

請協助確認以下問題：

1. `psy-btn` 是否只負責 component skin，而不負責 layout？
2. 是否應提供官方 mobile CTA class，例如：

   ```text
   psy-btn-block
   psy-btn-full
   psy-btn-mobile
   psy-btn-cta
   psy-btn-center
   ```

3. 是否應在 README 補充 mobile button placement pattern？
4. 在 narrow viewport 中，`psy-btn` 的 shadow offset 是否需要搭配 recommended margin / container？
5. 是否應提供「button inside card」與「standalone button between blocks」兩種範例？
6. 對 Angular / Web Component wrapper，是否建議 wrapper host 加上 `display: inline-flex`、`display: block` 或 `width: fit-content`？

## AI Agent 後續排查方向

若要在本專案內先做最小修正，請優先考慮 wrapper 或 page layout，不要修改 `node_modules/mimosa-design-system`。

可評估方向：

1. 在 `RaveButtonComponent` host 補上 layout class / host style：

   ```css
   :host {
     display: inline-flex;
   }
   ```

2. 新增 wrapper input，例如：

   ```ts
   @Input() layout: 'inline' | 'block' | 'full' = 'inline';
   ```

3. Mobile smoke 頁若是主要 CTA，可改成：

   ```html
   <div class="mobile-cta-row">
     <rave-button>Start smoke check</rave-button>
   </div>
   ```

4. 若 Mimosa 官方提供 `psy-btn-full` / `psy-btn-cta`，優先使用官方 class。

5. 避免在每個 page 用零散 CSS 猜 button 對齊，應將行為收斂在 wrapper 或 Mimosa 官方 class。

## 最小驗收標準

修正後，請同時檢查 Web 與 Mobile：

- Web `Run smoke check` 按鈕維持目前正常視覺。
- Mobile `Start smoke check` 不再看起來貼左或與上下 block 節奏不一致。
- Button shadow 不應讓元件看起來跑出版面。
- Mobile CTA 應有明確的 layout 語意：置中、滿版、或與 card 寬度對齊。

## 本專案相關檔案

```text
packages/ui/src/lib/button.component.ts
apps/mobile/src/app/features/index/index.page.html
apps/mobile/src/app/features/index/index.page.css
apps/web/src/app/features/index/index.page.html
apps/web/src/app/features/index/index.page.css
```

## 結論

`mimosa-design-system@0.2.6` 已明顯改善 card / kicker / EmptyState 可讀性問題，但 Mobile standalone CTA button 仍缺少明確的 layout guidance。Web 正常是因為按鈕被 card/form context 包住；Mobile 異常是因為按鈕獨立存在於 page grid 中，缺少 button layout primitive 或 wrapper host contract。
