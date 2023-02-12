export const series = {
  // todo README.md 无法展示，没有对 '' 进行处理
  '/docs/guide/': [
    'introduce',
    'getting-started',
    'style',
    'icon',
    'folder-specification',
    'contribute',
  ],
  '/docs/theme/': [
    {
      text: '主题配置',
      children: [
        'frontmatter',
        'home',
        'series',
        'navbar',
        'comments',
        'auto-set-category',
        'bulletin-popover',
        'register-components',
        'password',
      ],
    },
    {
      text: 'Markdown 扩展',
      children: ['custom-container', 'custom-style', 'markdown'],
    },
    {
      text: '高级',
      children: ['custom-catalog-title', 'custom-primary-color'],
    },
  ],
  '/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
