export const series = {
  // todo README.md 无法展示，没有对 '' 进行处理
  '/en/docs/guide/': [
    'introduce',
    'getting-started',
    'style',
    'icon',
    'folder-specification',
    'contribute',
  ],
  '/en/docs/theme/': [
    {
      text: 'Frontmatter',
      children: ['frontmatter-home', 'frontmatter-page'],
    },
    {
      text: 'Theme Configuration',
      children: [
        'home',
        'series',
        'navbar',
        'comments',
        'bulletin-popover',
        'register-components',
        'password',
        'appearance',
        'doc-search',
        'auto-set-category',
        'auto-set-series',
        'custom-catalog-title',
        'custom-primary-color',
      ],
    },
    {
      text: 'Markdown Extension',
      children: [
        'custom-container',
        'markdown-task',
        'markdown-vue-preview',
        'markdown-file-parse',
      ],
    },
    {
      text: 'Other',
      children: ['custom-style', 'builtin-page'],
    },
  ],
  '/en/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
