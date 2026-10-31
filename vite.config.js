import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { careersApiPlugin } from "./server/vite-careers.js";

export default defineConfig(({ mode }) => ({
  server: { host: "127.0.0.1", allowedHosts: ["terminal.local"] },
  preview: { host: "127.0.0.1" },
  build: { sourcemap: false },
  plugins: [react(), careersApiPlugin({ ...loadEnv(mode, process.cwd(), ""), ...process.env })],
}));
