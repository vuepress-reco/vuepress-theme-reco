import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: '/icon_vuepress_reco.png',
    // sidebar: [
    //   // SidebarItem
    //   {
    //     text: 'Foo',
    //     link: '/foo/',
    //     children: [
    //       // SidebarItem
    //       {
    //         text: 'github',
    //         link: 'https://github.com',
    //         children: [
    //           {
    //             text: 'subChild',
    //             link: 'www.github.com',
    //             children: [{ text: 'subSubChild', link: 'www.github.com' }],
    //           },
    //         ],
    //       },
    //       // 字符串 - 页面文件路径
    //       '/foo/bar.md',
    //     ],
    //   },
    //   // SidebarGroup
    //   {
    //     isGroup: true,
    //     text: 'Group',
    //     children: ['/group/foo.md', '/group/bar.md'],
    //   },
    //   // 字符串 - 页面文件路径
    //   '/bar/README.md',
    // ],
    sidebar: {
      '/group/': [
        {
          isGroup: true,
          text: 'group',
          children: ['/group/bar.md', '/group/foo.md'],
        },
      ],
      '/blogs/': [
        {
          isGroup: true,
          text: 'blogs1',
          children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
        },
        {
          isGroup: true,
          text: 'blogs2',
          children: ['/blogs/category2/blog1.md', '/blogs/category2/blog2.md'],
        },
      ],
    },
    navbar: [
      // NavbarItem
      {
        text: 'group',
        link: '/group/bar.html',
      },
      // NavbarGroup
      {
        text: 'blogs',
        children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
  },
  // debug: true,
})
