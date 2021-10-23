import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import './styles/index.css'
import Icon from '../client/components/Icon.vue'

export default defineClientAppEnhance(({ app, router }) => {
  // 默认安装 SearchBox，如果需要使用 algolia，需要自行安装
  app.component('NavbarSearch', () => {
    const SearchComponent =
      app.component('Docsearch') || app.component('SearchBox')
    if (SearchComponent) {
      return h(SearchComponent)
    }
    return null
  })

  app.component('Icon', () => Icon)
})
