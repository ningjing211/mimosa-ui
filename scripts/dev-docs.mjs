import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDocsCss } from "./build-docs-css.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.resolve(projectRoot, "docs");

function spawnDetached(command, args, label) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true
  });

  child.on("error", (error) => {
    console.error(`[${label}]`, error);
    process.exit(1);
  });

  return child;
}

async function main() {
  console.log("Building docs CSS (initial) …");
  await buildDocsCss();

  const watch = spawnDetached("node", ["./scripts/build-docs-css.mjs", "--watch"], "css-watch");
  const server = spawnDetached("npx", ["serve", docsRoot, "-l", "5173"], "serve");

  const shutdown = () => {
    watch.kill("SIGTERM");
    server.kill("SIGTERM");
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  console.log("\nDocs dev server: http://localhost:5173/");
  console.log("  index.html & design-system.html → docs.bundle.css (Tailwind + watch)\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
