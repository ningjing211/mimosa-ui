import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const v16Root = path.resolve(__dirname, "../../mock-up/web-home/v16-psychedelic");

export default defineConfig({
  root: v16Root,
  plugins: [tailwindcss()],
  server: {
    port: 5175,
    open: "/design-system.html"
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(v16Root, "design-system.html")
    }
  }
});
