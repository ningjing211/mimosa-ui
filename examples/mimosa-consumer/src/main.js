import "mimosa-design-system";
import "mimosa-design-system/tokens.css";

const root = document.getElementById("app");
root.innerHTML = `
  <header class="top-nav">
    <div class="top-nav-main">
      <div class="brand">Mimosa consumer</div>
      <nav class="nav-links" aria-label="示範">
        <span class="chip">npm pack</span>
        <span class="chip">Vite</span>
      </nav>
    </div>
  </header>
  <main class="content">
    <section class="hero panel">
      <p class="kicker">SMOKE TEST</p>
      <h1>已成功從套件載入樣式</h1>
      <p class="subtitle">
        若 <code>mimosa-design-system</code> 與 <code>mimosa-design-system/tokens.css</code> 可正常解析，代表
        <code>exports</code> 與 <code>dist/</code> 產物可供外部專案使用。
      </p>
      <div class="hero-actions">
        <span class="button primary">Primary</span>
        <span class="button">Secondary</span>
      </div>
    </section>
  </main>
`;
