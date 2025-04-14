import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        header: resolve(__dirname, "src/public/partials/header.html"),
        footer: resolve(__dirname, "src/public/partials/footer.html"),
      },
    },
  },
  server: {
    port: 5713,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
