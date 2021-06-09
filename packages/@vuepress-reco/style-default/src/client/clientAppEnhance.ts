import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import './styles/index.scss'

export default defineClientAppEnhance(({ app, router }) => {
  // eslint-disable-next-line vue/match-component-file-name
  app.component('NavbarSearch', () => {
    const SearchComponent =
      app.component('Docsearch') || app.component('SearchBox')
    if (SearchComponent) {
      return h(SearchComponent)
    }
    return null
  })
})
