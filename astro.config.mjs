/// <reference types="astro/client" />
// @ts-check

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skincare-shop.pages.dev',

  // SSR mode is required for Cloudflare adapter
  output: 'server',

  // The Cloudflare adapter handles the webworker target automatically
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],

    // SSR configuration for Cloudflare Compatibility
    ssr: {
      external: [
        'node:assert',
        'node:async_hooks',
        'node:buffer',
        'node:crypto',
        'node:events',
        'node:fs',
        'node:http',
        'node:https',
        'node:os',
        'node:path',
        'node:stream',
        'node:util',
        'node:url',
        'node:zlib',
      ],
      noExternal: ['react', 'react-dom', 'react-router-dom'],
    },

    resolve: {
      alias: {
        // Essential for React SSR on Cloudflare Workers
        'react-dom/server': 'react-dom/server.edge',
      },
    },

    optimizeDeps: {
      exclude: [
        'eslint',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-import',
        'eslint-plugin-astro',
        'eslint-plugin-storybook',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-config-prettier',
      ],
    },

    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'EVAL') return;
          warn(warning);
        },
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
