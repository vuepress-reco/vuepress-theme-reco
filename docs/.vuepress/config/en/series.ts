export const series = {
  // todo README.md 无法展示，没有对 '' 进行处理
  '/en/docs/guide/': [
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
  '/en/docs/theme/': [
    {
      text: 'Frontmatter',
      children: ['frontmatter-home', 'frontmatter-page'],
    },
    {
      text: 'Theme Configuration',
      children: [
        {
          text: 'Locale Config',
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
            'social-links',
            'pages',
            'doc-search',
            'auto-set-category',
            'auto-set-series',
            'custom-primary-color',
          ]
        },
        {
          text: 'Multilingual',
          children: [
            'multilingual'
          ]
        }
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
  ],
  '/en/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
