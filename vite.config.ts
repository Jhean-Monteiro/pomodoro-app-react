import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base removido — Vercel usa "/"
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
