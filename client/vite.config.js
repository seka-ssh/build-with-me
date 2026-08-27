import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:5000", changeOrigin: true } },
  },
  // Absolute base ensures assets resolve correctly under the custom domain.
  base: "/",
  build: { outDir: "dist", sourcemap: true },
});
