import "./mimosa-tailwind.css";

const root = document.getElementById("app");
root.innerHTML = `
  <div class="min-h-screen psy-page-bg font-psy-body text-psy-text-primary">
    <header
      class="psy-nav-gradient psy-brutal sticky top-0 z-10 grid gap-psy-4 border-psy-border-strong px-psy-8 py-psy-6 text-psy-nav-text"
    >
      <div class="flex flex-wrap items-center justify-between gap-psy-7">
        <div class="font-psy-display text-psy-brand font-extrabold">Mimosa consumer</div>
        <nav class="flex flex-wrap gap-psy-3" aria-label="示範">
          <span
            class="psy-brutal psy-focus-ring inline-block bg-psy-chip-bg px-psy-3 py-psy-2 text-psy-chip text-psy-chip-text"
          >npm pack</span>
          <span
            class="psy-brutal psy-focus-ring inline-block bg-psy-chip-bg px-psy-3 py-psy-2 text-psy-chip text-psy-chip-text"
          >Tailwind v4</span>
        </nav>
      </div>
    </header>

    <main class="mx-auto mb-psy-13 mt-psy-11 w-[min(1180px,calc(100%-var(--psy-space-12)))]">
      <section class="psy-brutal psy-hero-gradient mb-psy-9 p-psy-10">
        <p class="mb-psy-3 text-psy-chip font-bold tracking-[var(--psy-letter-spacing-kicker)] text-psy-kicker uppercase">
          SMOKE TEST · TAILWIND
        </p>
        <h1 class="font-psy-display text-psy-h1 font-extrabold leading-tight">
          Token 橋接 + Tailwind 組裝
        </h1>
        <p class="mt-psy-4 max-w-2xl text-psy-subtitle leading-relaxed text-psy-text-secondary">
          樣式來自 <code class="text-psy-text-primary">mimosa-design-system/tokens.css</code>，
          版面與間距用 Tailwind；硬陰影與漸層保留在
          <code class="text-psy-text-primary">mimosa-tailwind.css</code> 的 <code>@layer components</code>。
        </p>
        <div class="mt-psy-8 flex flex-wrap gap-psy-3">
          <span
            class="psy-brutal psy-focus-ring inline-flex min-h-11 items-center justify-center bg-psy-action-primary-bg px-psy-7 text-psy-button font-extrabold text-psy-action-primary-text"
          >Primary</span>
          <span
            class="psy-brutal psy-focus-ring inline-flex min-h-11 items-center justify-center bg-psy-action-secondary-bg px-psy-7 text-psy-button font-extrabold text-psy-action-secondary-text"
          >Secondary</span>
        </div>
      </section>

      <section class="psy-brutal bg-[color-mix(in_srgb,var(--psy-surface-panel)_55%,transparent)] p-psy-8 backdrop-blur-sm">
        <h2 class="font-psy-display text-xl font-extrabold">Step 1 完成項目</h2>
        <ul class="mt-psy-4 list-disc space-y-psy-2 pl-psy-6 text-psy-body text-psy-text-secondary">
          <li><code>@import tokens</code> → <code>@theme</code> 映射（不重複 hex）</li>
          <li>Consumer 示範頁改為 Tailwind utilities 為主</li>
          <li>下一步：design-system 文件站或 product <code>styles.css</code> 漸進遷移</li>
        </ul>
      </section>
    </main>
  </div>
`;
