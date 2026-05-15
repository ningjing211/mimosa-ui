/**
 * GitHub Pages 靜態站組裝（僅 CI / 維護者手動執行，非 npm package script）。
 * 前置：dist/ 已由 scripts/build.mjs 產出；並含已 commit 或本次編譯的 dist/mimosa.css。
 */
import { spawn } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.resolve(projectRoot, "docs");
const distRoot = path.resolve(projectRoot, "dist");
const siteRoot = path.resolve(projectRoot, ".site");

const htmlFiles = ["index.html", "design-system.html"];
const tailwindEntry = path.resolve(docsRoot, "mimosa-entry.css");
const mimosaCssOut = path.resolve(distRoot, "mimosa.css");

function compileMimosaCss() {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["@tailwindcss/cli", "-i", tailwindEntry, "-o", mimosaCssOut], {
      cwd: projectRoot,
      stdio: "inherit",
      shell: true
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`mimosa.css compile failed with exit code ${code}`));
    });
  });
}

function normalizeDocsHtml(html) {
  return html.replaceAll("../dist/", "./dist/");
}

async function buildDocs() {
  console.log("Compiling dist/mimosa.css for GitHub Pages …");
  await compileMimosaCss();

  await rm(siteRoot, { recursive: true, force: true });
  await mkdir(siteRoot, { recursive: true });

  await Promise.all([
    cp(path.resolve(docsRoot, "assets"), path.resolve(siteRoot, "assets"), { recursive: true }),
    cp(distRoot, path.resolve(siteRoot, "dist"), { recursive: true })
  ]);

  await Promise.all(
    htmlFiles.map(async (file) => {
      const sourcePath = path.resolve(docsRoot, file);
      const targetPath = path.resolve(siteRoot, file);
      const html = await readFile(sourcePath, "utf8");
      await writeFile(targetPath, normalizeDocsHtml(html), "utf8");
    })
  );

  console.log("mimosa docs build complete → .site/");
}

buildDocs();
