import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build", // CRA's default build output
  },
  resolve: {
    alias: {
      "@components": `${path.resolve(__dirname, "./src/components")}`,
      "@services": `${path.resolve(__dirname, "./src/services")}`,
      "@styles": `${path.resolve(__dirname, "./src/styles")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils")}`,
    },
  },
});
