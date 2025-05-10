import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { dirname, resolve } from "path";

// const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     shared: resolve(__dirname, "src/shared"),
  //     utils: resolve(__dirname, "src/utils"),
  //     master: resolve(__dirname, "src/master"),
  //     modules: resolve(__dirname, "src/modules"),
  //     layouts: resolve(__dirname, "src/layouts"),
  //   },
  // },

  define: {
    "process.env": {}, // This prevents crashes but doesn't add real values
  },
});
