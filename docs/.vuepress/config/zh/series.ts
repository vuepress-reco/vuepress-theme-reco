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
      text: 'Frontmatter',
      children: ['frontmatter-page', 'frontmatter-home'],
    },
    {
      text: '主题配置',
      children: [
        'series',
        'navbar',
        'comments',
        'auto-set-category',
        'bulletin-popover',
        'register-components',
        'password',
        'appearance',
        'custom-catalog-title',
        'custom-primary-color',
      ],
    },
    {
      text: 'Markdown 扩展',
      children: [
        'custom-container',
        'markdown-task',
        'markdown-vue-preview',
        'markdown-file-parse',
      ],
    },
    {
      text: '其他',
      children: ['custom-style'],
    },
  ],
  '/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
