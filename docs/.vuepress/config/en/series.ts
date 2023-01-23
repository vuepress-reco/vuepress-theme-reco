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
      text: 'Basic',
      children: [
        'introduce',
        'usage',
        'custom-catalog-title',
        'custom-primary-color',
      ],
    },
    {
      text: 'Advance',
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
  '/en/docs/plugins/': ['page', 'comments', 'vue-previews', 'bulletin-popover'],
}
