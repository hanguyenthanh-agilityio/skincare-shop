// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skincare-shop.pages.dev',

  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],

    optimizeDeps: {
      exclude: [
        'eslint',
        '@eslint/js',
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

    // resolve: {
    //   conditions: ['worker'],
    //   alias: {
    //     'react-dom/server': 'react-dom/server.edge',
    //   },
    // },

    // ssr: {
    //   noExternal: ['react-dom'],
    // },

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

  output: 'server',

  adapter: cloudflare(),
});
