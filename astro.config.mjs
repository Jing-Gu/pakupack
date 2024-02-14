import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

 //https://astro.build/config
export default defineConfig({
  site: 'https://jing-gu.github.io/pakupack',
  output: 'static',
  //to change to real
  //site: 'https://www.pakupack.app'
  integrations: [mdx(), sitemap(), tailwind(), react()]
});