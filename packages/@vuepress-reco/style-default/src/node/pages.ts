export const pages = [
  {
    type: 'frontmatter',
    frontmatterKey: 'categories',
    path: '/categories/',
    layout: 'Categories',
    pagination: 10,
  },
  {
    type: 'frontmatter',
    frontmatterKey: 'tags',
    path: '/tags/',
    layout: 'Tags',
    pagination: 10,
  },
  {
    path: '/timeline/',
    layout: 'TimeLine',
  },
]
