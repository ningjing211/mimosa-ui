import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit"
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function diffDist() {
  const result = spawnSync(
    "git",
    ["diff", "--exit-code", "--", "dist", ":(exclude)dist/mimosa.css"],
    {
      cwd: projectRoot,
      encoding: "utf8"
    }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status === 0) {
    console.log("dist is in sync with src/theme");
    return;
  }

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  console.error(
    "npm dist artifacts are out of date with src/theme. Run `npm run build` and commit the updated dist files."
  );
  process.exit(result.status ?? 1);
}

run("node", ["./scripts/build.mjs"]);
diffDist();
