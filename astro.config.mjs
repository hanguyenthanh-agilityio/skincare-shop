// <reference types="astro/client" />
// @ts-check

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skincare-shop.pages.dev',

  output: 'server',
  adapter: cloudflare(),

  integrations: [
    react({
      experimentalDisableStreaming: true,
      experimentalReactChildren: true,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['react', 'react-dom'],
    },
    resolve: {
      alias: {
        // Fix for React SSR on Workers (issue #12824)
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },

  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
      fallbackType: 'rewrite',
    },
  },
});
