import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Lemonaid",
        short_name: "Lemonaid",
        description: "Mindfulness and relaxation techniques",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          // Windows icons
          {
            src: "icons/windows11/Square150x150Logo.scale-100.png",
            sizes: "150x150",
            type: "image/png",
          },
          // Android icons
          {
            src: "icons/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          // iOS icons
          {
            src: "icons/ios/180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "icons/ios/1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  envDir: ".",
});
