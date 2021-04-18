export const pages = [
  {
    type: 'frontmatter',
    frontmatterKey: 'reco-categories',
    path: '/categories/',
    layout: 'Categories',
    pagination: 10,
  },
  {
    type: 'frontmatter',
    frontmatterKey: 'reco-tags',
    path: '/tags/',
    layout: 'Tags',
    pagination: 10,
  },
  {
    path: '/timeline/',
    layout: 'TimeLine',
  },
]
