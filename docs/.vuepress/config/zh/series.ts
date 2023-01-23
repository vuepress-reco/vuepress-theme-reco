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
      text: '基础',
      children: [
        'introduce',
        'usage',
        'custom-catalog-title',
        'custom-primary-color',
      ],
    },
    {
      text: '高级',
      children: [
        'home',
        'series',
        'comments',
        'auto-set-category',
        'custom-container',
        'custom-style',
        'code-import',
        'bulletin-popover',
        'register-components',
        'password',
      ],
    },
  ],
  '/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
