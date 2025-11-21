import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "scripts/copy-assets.js"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  esbuildOptions(options) {
    options.assetNames = "images/osp-chakra-reusable-components/[name]"; // keeps original filename, no hash
    options.loader = {
      ".jpg": "file",
      ".png": "file",
      ".svg": "file",
      ".webp": "file"
    };
  },
});
