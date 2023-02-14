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
      text: 'Theme Configuration',
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
        'appearance',
      ],
    },
    {
      text: 'Markdown Extension',
      children: ['custom-container', 'custom-style', 'markdown'],
    },
    {
      text: 'Advance',
      children: ['custom-catalog-title', 'custom-primary-color'],
    },
  ],
  '/en/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
