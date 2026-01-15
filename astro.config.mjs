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

    // ssr: {
    //   target: 'webworker',
    //   noExternal: ['react', 'react-dom'],
    // },

    // resolve: {
    //   alias: {
    //     'react-dom/server': 'react-dom/server.edge',
    //     'react-dom/server.browser': 'react-dom/server.edge',
    //   },
    // },

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

  image: {
    service: {
      entrypoint: 'astro/assets/services/compile',
    },
  },
});
