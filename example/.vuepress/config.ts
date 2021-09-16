import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'reco_luan',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
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
    series: {
      '/group/': [
        {
          text: 'group',
          children: ['/group/bar.md', '/group/foo.md'],
        },
      ],
      '/blogs/': [
        {
          text: 'blogs1',
          children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
        },
        {
          text: 'blogs2',
          children: ['/blogs/category2/blog1.md', '/blogs/category2/blog2.md'],
        },
      ],
    },
    navbar: [
      {
        text: 'Categories',
        children: [
          {
            text: 'group',
            link: '/group/bar.html',
            children: [
              {
                text: 'group1',
                link: '/group/bar.html',
              },
              {
                text: 'group2',
                link: '/group/bar1.html',
              },
            ],
          },
          {
            text: 'group',
            link: '/group/bar.html',
            children: [
              {
                text: 'group1',
                link: '/group/bar.html',
              },
              {
                text: 'group2',
                link: '/group/bar1.html',
              },
            ],
          },
        ],
      },
      // NavbarItem
      {
        text: 'Group',
        link: '/group/bar.html',
      },
      // NavbarGroup
      {
        text: 'Blogs',
        children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
      },
    ],
  },
  // debug: true,
})
