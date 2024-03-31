export const pages = [
  {
    type: 'category',
    frontmatterKey: 'categories',
    path: '/categories.html',
    layout: 'Categories',
    pagination: 10,
  },
  {
    type: 'category',
    frontmatterKey: 'tags',
    path: '/tags.html',
    layout: 'Categories',
    pagination: 10,
  },
  {
    path: '/timeline.html',
    layout: 'Timeline',
  },
  {
    path: '/posts.html',
    layout: 'Posts',
  },
  {
    path: '/friendship-link.html',
    layout: 'FriendshipLink',
  },
]
