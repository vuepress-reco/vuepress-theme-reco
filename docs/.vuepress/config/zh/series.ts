export const series = {
  // todo README.md 无法展示，没有对 '' 进行处理
  '/docs/guide/': [
    'introduce',
    'getting-started',
    'gui-builder',
    'package-manager',
    'custom-style',
    'style',
    'icon',
    'bundler',
    'builtin-page',
    'folder-specification',
    'register-components',
    'register-layouts',
    'contribute',
  ],
  '/docs/theme/': [
    {
      text: 'Frontmatter',
      children: ['frontmatter-home', 'frontmatter-page'],
    },
    {
      text: '主题配置',
      children: [
        'home',
        'source-dir',
        'git',
        'series',
        'navbar',
        'comments',
        'bulletin-popover',
        'password',
        'appearance',
        'pages',
        'doc-search',
        'auto-set-category',
        'auto-set-series',
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
  ],
  '/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
