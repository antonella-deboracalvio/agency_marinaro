import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { careersApiPlugin } from "./server/vite-careers.js";

export default defineConfig(({ mode }) => ({
  server: { allowedHosts: ["terminal.local"] },
  plugins: [react(), careersApiPlugin({ ...loadEnv(mode, process.cwd(), ""), ...process.env })],
}));
