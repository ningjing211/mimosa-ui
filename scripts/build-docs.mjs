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

async function buildDocs() {
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
      const normalizedHtml = html.replaceAll("../dist/", "./dist/");
      await writeFile(targetPath, normalizedHtml, "utf8");
    })
  );

  console.log("mimosa docs build complete");
}

buildDocs();
