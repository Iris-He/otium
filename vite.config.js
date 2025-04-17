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
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
        maximumFileSizeToCacheInBytes: 2.5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-site\.netlify\.app\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "site-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    headers: {
      "Service-Worker-Allowed": "/",
      "Service-Worker": "script",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false, // Change this from true to false
  },
  envDir: ".",
  workbox: {
    navigateFallback: "/index.html",
  },
});
