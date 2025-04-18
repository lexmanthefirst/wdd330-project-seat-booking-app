import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  base: "/",
  publicDir: "src/public", // Explicitly define public directory
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        moviePage: resolve(__dirname, "src/moviePage/index.html"),
      },
    },
  },
  server: {
    port: 5713,
    open: true,
    // Add middleware to handle header/footer partials
    middleware: (app) => {
      app.use("/partials", (req, res, next) => {
        res.header("Content-Type", "text/html");
        next();
      });
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Add aliases for public assets
      "@assets": resolve(__dirname, "./src/public/assets"),
      "@partials": resolve(__dirname, "./src/partials"),
    },
  },
});
