import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

const isCloudflare = import.meta.env.CF_PAGES === '1';

export default defineConfig({
  site: isCloudflare ? 'https://skincare-shop.pages.dev' : 'http://localhost:4321',

  output: 'server',

  adapter: isCloudflare ? cloudflare() : node({ mode: 'standalone' }),

  integrations: [react({ experimentalDisableStreaming: true }), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    ...(isCloudflare && {
      ssr: {
        target: 'webworker',
        noExternal: ['react', 'react-dom'],
      },
      resolve: {
        alias: {
          'react-dom/server': 'react-dom/server.edge',
          'react-dom/server.browser': 'react-dom/server.edge',
        },
      },
    }),
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
