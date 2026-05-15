import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "../../mock-up/web-home/v16-psychedelic"),
  publicDir: false,
  server: {
    port: 5174,
    open: true
  }
});
