import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import './styles/index.scss'
import Icon from '../client/components/Icon.vue'

export default defineClientAppEnhance(({ app, router }) => {
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
