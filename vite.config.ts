import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import path, { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    vanillaExtractPlugin(),
    electron([
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        vite: {
          build: {
            lib: {
              entry: resolve(__dirname, "electron/preload.ts"),
              formats: ["cjs"],
              fileName: (format) => `preload.${format}`,
            },
          },
        },
      },
    ]),
    renderer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
});
