import { h } from 'vue'

export function resolveSearchComponent(app) {
  // 默认安装 SearchBox，如果需要使用 algolia，需要自行安装
  app.component('NavbarSearch', () => {
    const SearchComponent =
      app.component('Docsearch') || app.component('SearchBox')
    if (SearchComponent) {
      return h(SearchComponent)
    }
    return null
  })
}
