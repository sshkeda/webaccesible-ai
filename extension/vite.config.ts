import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import customDynamicImport from "./src/lib/plugins/custom-dynamic-import";

const contentScriptFileName = ["_commonjsHelpers", "axe-analyze"];

export default defineConfig({
  plugins: [react(), customDynamicImport()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: false,

    rollupOptions: {
      input: {
        popup: "index.html",
        content: "src/main.tsx",
        "content-script": "src/content-script/index.ts",
      },

      output: {
        chunkFileNames: (assetInfo) => {
          if (contentScriptFileName.includes(assetInfo.name)) {
            return "assets/content-script/[name].js";
          }

          return "assets/[name].js";
        },
        entryFileNames: (assetInfo) => {
          if (assetInfo.name === "content-script") {
            return "assets/content-script/index.js";
          }

          return "assets/[name].js";
        },
      },
    },
  },
});
