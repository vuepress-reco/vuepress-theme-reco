import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // base: '/reco/',
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    authorAvatar: '/logo.png',
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
      ],
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Cat', link: '/categories/cat1/1/' },
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
    // valine 设置
    // valineConfig: {
    //   appId: 'jvc9s4BkJYQNOcpsbVTPMePe-gzGzoHsz',
    //   appKey: 'Js91M9DfM9vPwVaUj7xdkbxh',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true, //
    //   recordIP: true,
    //   // hideComments: true
    // },
    // vssueConfig: {
    //   admins: ['recoluan'],
    //   platform: 'github',
    //   owner: 'vuepress-reco',
    //   repo: 'vuepress-reco.github.io',
    //   clientId: '4d81cea3b3d8aac8e88e',
    //   clientSecret: 'd23e8556b6d3c85abffbf4b8d853afb2ea08875a',
    // },
    record: 'xxxx',
    cyberSecurityRecord: 'xxx',
    startYear: '2018',
    socialLinks: [
      { icon: 'BrandGithub', link: 'https://github.com/recoluan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' }
    ]
  },
  // debug: true,
})
