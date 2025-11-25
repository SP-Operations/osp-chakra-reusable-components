import { defineConfig } from "tsup";
import copy from "esbuild-plugin-copy";

export default defineConfig({
  entry: ["src/index.ts"],
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
  esbuildPlugins: [
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["scripts/copy-assets.js"],
          to: ["dist/scripts/"]
        }
      ]
    })
  ]
});
