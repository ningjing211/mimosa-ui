import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const srcRoot = path.resolve(packageRoot, "src/theme");
const distDir = path.resolve(packageRoot, "dist");

const tokenSourcePath = path.resolve(srcRoot, "tokens.css");

function extractTokenMap(cssText) {
  const tokenMap = {};
  const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match = varRegex.exec(cssText);

  while (match) {
    tokenMap[`--${match[1]}`] = match[2].trim();
    match = varRegex.exec(cssText);
  }

  return tokenMap;
}

async function build() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const [tokensCss, tailwindCss] = await Promise.all([
    readFile(tokenSourcePath, "utf8"),
    readFile(path.resolve(srcRoot, "tailwind.css"), "utf8")
  ]);

  const tokenJson = JSON.stringify(extractTokenMap(tokensCss), null, 2);

  const distTailwindDir = path.resolve(distDir, "tailwind");
  const tailwindSourceDir = path.resolve(srcRoot, "tailwind");
  const tailwindPartials = [
    "theme.css",
    "base.css",
    "components.css",
    "product.css",
    "chrome.css",
    "flow-page.css"
  ];

  await mkdir(distTailwindDir, { recursive: true });

  await Promise.all([
    writeFile(path.resolve(distDir, "tokens.css"), tokensCss, "utf8"),
    writeFile(path.resolve(distDir, "tokens.json"), tokenJson, "utf8"),
    writeFile(path.resolve(distDir, "tailwind.css"), tailwindCss, "utf8"),
    ...tailwindPartials.map((file) =>
      copyFile(path.resolve(tailwindSourceDir, file), path.resolve(distTailwindDir, file))
    )
  ]);

  console.log("mimosa build complete");
}

build();
