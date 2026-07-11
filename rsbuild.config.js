// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact({
      reactCompiler: true,
    }),
    pluginTailwindcss(),
  ],
  html: {
    title: 'COJAG watermark tool',
    favicon: './public/favicon.png',
    meta: {
      description:
        'Batch-watermark photos with a logo and export them as a ZIP — entirely in your browser.',
      'theme-color': '#0f1115',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
    tags: [
      {
        tag: 'link',
        attrs: { rel: 'manifest', href: '/manifest.webmanifest' },
      },
      {
        tag: 'link',
        attrs: { rel: 'apple-touch-icon', href: '/favicon.png' },
      },
    ],
  },
});
