// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Update this to your actual Vercel URL after first deploy,
  // or your custom domain if you have one (e.g. 'https://thabosibanda.dev')
  site: 'https://thabo-sibanda-portfolio.vercel.app',

  // Static output — works on Vercel, GitHub Pages, Netlify, Cloudflare Pages
  output: 'static',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      langs: ['bash', 'python', 'powershell', 'javascript', 'typescript', 'yaml', 'json', 'html', 'css'],
      wrap: true,
    },
  },

  server: {
    port: 4321,
    host: true,
  },
});
