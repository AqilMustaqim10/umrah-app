import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      // ── Registration strategy ──────────────────────────
      // 'autoUpdate' = service worker updates automatically
      registerType: "autoUpdate",

      // ── Dev options ────────────────────────────────────
      // Enable PWA in development so we can test it
      devOptions: {
        enabled: true,
      },

      // ── Files to cache ─────────────────────────────────
      includeAssets: ["favicon.ico", "icons/*.svg", "icons/*.png"],

      // ── Manifest configuration ─────────────────────────
      // This becomes your manifest.json
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

        // ── App shortcuts (long press on icon) ────────────
        shortcuts: [
          {
            name: "Umrah Checklist",
            short_name: "Umrah",
            description: "View your Umrah checklist",
            url: "/umrah-checklist",
            icons: [
              {
                src: "icons/icon-192x192.svg",
                sizes: "192x192",
              },
            ],
          },
          {
            name: "Packing List",
            short_name: "Packing",
            description: "View your packing checklist",
            url: "/packing-checklist",
            icons: [
              {
                src: "icons/icon-192x192.svg",
                sizes: "192x192",
              },
            ],
          },
        ],

        // ── Screenshots for app store display ─────────────
        categories: ["productivity", "lifestyle", "utilities"],
      },

      // ── Workbox configuration (service worker) ─────────
      workbox: {
        // Cache these file types
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],

        // ── Runtime caching strategies ───────────────────
        runtimeCaching: [
          {
            // Cache API calls to our backend
            urlPattern: /^https:\/\/.*\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
