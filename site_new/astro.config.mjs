// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  base: '/claude_harness/',
  site: 'https://MQCCharness.github.io',
  integrations: [
    starlight({
      title: 'Swarm & Legion',
      description: '蜂群+军团治理体系 — AI 辅助软件开发的多角色对抗式协作方法论',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/MQCCharness/claude_harness' },
      ],
      defaultLocale: 'zh-CN',
      locales: {
        'zh-CN': { label: '简体中文', lang: 'zh-CN' },
      },
      editLink: {
        baseUrl: 'https://github.com/MQCCharness/claude_harness/edit/main/site/',
      },
      sidebar: [
        {
          label: '概述',
          items: [
            { label: '欢迎', link: '/' },
            { label: '快速开始', link: '/quickstart/' },
            { label: '设计哲学', link: '/philosophy/' },
          ],
        },
        {
          label: '蜂群模式 (L2)',
          autogenerate: { directory: 'swarm' },
        },
        {
          label: '军团模式 (L3)',
          autogenerate: { directory: 'legion' },
        },
        {
          label: '参考',
          autogenerate: { directory: 'reference' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
  ],
});
