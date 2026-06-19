import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/pomodoro/", // Aponta para o nome do repositório no GitHub Pages
  resolve: {
    dedupe: ["react", "react-dom"], // força uma única cópia
  },
});