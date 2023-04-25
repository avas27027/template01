import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (command === "serve") {
    return {
      plugins: [react()],
      server: {
        host: true,
      },
    };
  } else {
    return {
      plugins: [react()],
      //base: env.VITE_PROD_URL,
    };
  }
});
