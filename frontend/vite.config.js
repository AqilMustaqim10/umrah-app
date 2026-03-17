import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "icons/*.svg", "icons/*.png"],
      manifest: {
        name: "Umrah Companion",
        short_name: "Umrah",
        description: "Your complete guide to preparing for Umrah",
        theme_color: "#1B4332",
        background_color: "#F8F5F0",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "en",
        icons: [
          {
            src: "icons/icon-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "icons/icon-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        shortcuts: [
          {
            name: "Umrah Checklist",
            short_name: "Umrah",
            description: "View your Umrah checklist",
            url: "/umrah-checklist",
            icons: [{ src: "icons/icon-192x192.svg", sizes: "192x192" }],
          },
          {
            name: "Packing List",
            short_name: "Packing",
            description: "View your packing checklist",
            url: "/packing-checklist",
            icons: [{ src: "icons/icon-192x192.svg", sizes: "192x192" }],
          },
        ],
        categories: ["productivity", "lifestyle", "utilities"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
