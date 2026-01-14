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
      experimentalReactChildren: true,
      experimentalDisableStreaming: true,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
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
