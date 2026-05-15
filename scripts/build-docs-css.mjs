import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const inputPath = path.resolve(projectRoot, "docs/src/docs-app.css");
const bundlePath = path.resolve(projectRoot, "docs/assets/docs.bundle.css");
const overridesSource = path.resolve(projectRoot, "docs/src/docs-overrides.css");
const overridesAsset = path.resolve(projectRoot, "docs/assets/docs.css");

function runTailwindBuild({ watch = false } = {}) {
  return new Promise((resolve, reject) => {
    const args = ["@tailwindcss/cli", "-i", inputPath, "-o", bundlePath];
    if (watch) {
      args.push("--watch");
    }

    const child = spawn("npx", args, {
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
      reject(new Error(`docs css build failed with exit code ${code}`));
    });
  });
}

async function syncOverridesAsset() {
  await mkdir(path.dirname(overridesAsset), { recursive: true });
  await copyFile(overridesSource, overridesAsset);
}

export async function buildDocsCss({ watch = false } = {}) {
  await syncOverridesAsset();

  if (watch) {
    await runTailwindBuild({ watch: true });
    return;
  }

  await runTailwindBuild();
  console.log("docs css build complete → docs/assets/docs.bundle.css");
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const watch = process.argv.includes("--watch");
  buildDocsCss({ watch }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
