import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDocsCss } from "./build-docs-css.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.resolve(projectRoot, "docs");
const distRoot = path.resolve(projectRoot, "dist");
const siteRoot = path.resolve(projectRoot, ".site");

const htmlFiles = ["index.html", "design-system.html"];

function normalizeDocsHtml(html, fileName) {
  let out = html.replaceAll("../dist/", "./dist/");

  if (fileName === "index.html") {
    out = out
      .replace(
        /<link rel="stylesheet" href="\.\.\/dist\/mimosa\.css" \/>\s*\n\s*<link rel="stylesheet" href="\.\/assets\/docs\.css" \/>/,
        '<link rel="stylesheet" href="./assets/docs.bundle.css" />'
      )
      .replace(
        /<link rel="stylesheet" href="\.\/assets\/docs\.bundle\.css" \/>/,
        '<link rel="stylesheet" href="./assets/docs.bundle.css" />'
      );
  }

  return out;
}

async function buildDocs() {
  await buildDocsCss();

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
      await writeFile(targetPath, normalizeDocsHtml(html, file), "utf8");
    })
  );

  console.log("mimosa docs build complete");
}

buildDocs();
