import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/Jing-Gu/pakupack',
  //to change to real, no base needed
  //site: 'https://www.pakupack.app'
  integrations: [mdx(), sitemap(), tailwind(), react()]
});