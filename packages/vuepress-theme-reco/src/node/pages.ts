export const pages = [
  {
    type: 'category',
    frontmatterKey: 'categories',
    path: '/categories/',
    layout: 'Categories',
    pagination: 10,
  },
  {
    type: 'category',
    frontmatterKey: 'tags',
    path: '/tags/',
    layout: 'Categories',
    pagination: 10,
  },
  {
    path: '/timeline',
    layout: 'Timeline',
  },
  {
    path: '/posts',
    layout: 'Posts',
  },
  {
    path: '/friendship-link',
    layout: 'FriendshipLink',
  },
]
