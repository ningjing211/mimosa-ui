import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const sourceRoot = path.resolve(packageRoot, "../../mock-up/web-home/v16-psychedelic");
const distDir = path.resolve(packageRoot, "dist");

const tokenSourcePath = path.resolve(sourceRoot, "theme-tokens.css");
const appSourcePath = path.resolve(sourceRoot, "styles.css");
const docsSourcePath = path.resolve(sourceRoot, "design-system.css");

function normalizeImports(cssText) {
  return cssText.replace(
    /@import\s+["']\.\/theme-tokens\.css["'];/g,
    '@import "./tokens.css";'
  );
}

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
  await mkdir(distDir, { recursive: true });

  const [tokensCss, appCss, docsCss] = await Promise.all([
    readFile(tokenSourcePath, "utf8"),
    readFile(appSourcePath, "utf8"),
    readFile(docsSourcePath, "utf8")
  ]);

  const normalizedAppCss = normalizeImports(appCss);
  const normalizedDocsCss = normalizeImports(docsCss);
  const tokenJson = JSON.stringify(extractTokenMap(tokensCss), null, 2);

  const distTailwindDir = path.resolve(distDir, "tailwind");
  await mkdir(distTailwindDir, { recursive: true });

  const tailwindPartials = ["theme.css", "base.css", "components.css", "flow-page.css"];
  const packageSrc = path.resolve(packageRoot, "src");

  await Promise.all([
    writeFile(path.resolve(distDir, "tokens.css"), tokensCss, "utf8"),
    writeFile(path.resolve(distDir, "mimosa.css"), normalizedAppCss, "utf8"),
    writeFile(path.resolve(distDir, "docs.css"), normalizedDocsCss, "utf8"),
    writeFile(path.resolve(distDir, "tokens.json"), tokenJson, "utf8"),
    writeFile(
      path.resolve(distDir, "tailwind.css"),
      await readFile(path.resolve(packageSrc, "tailwind.css"), "utf8"),
      "utf8"
    ),
    ...tailwindPartials.map((file) =>
      copyFile(
        path.resolve(packageSrc, "tailwind", file),
        path.resolve(distTailwindDir, file)
      )
    )
  ]);

  // eslint-disable-next-line no-console
  console.log("mimosa build complete");
}

build();
