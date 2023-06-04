import { usePageLang  } from '@vuepress/client'
import Giscus, { GiscusProps } from '@giscus/vue';
import { PropType, computed, defineComponent, h, onMounted, ref, toRefs } from 'vue'

import type { VNode } from 'vue'

import '../styles/giscus.css'
import '../styles/giscus-theme.css'
import '../styles/giscus-theme-dark.css'

function getUrl(url: string): string {
  return new URL(url, import.meta.url).href;
}
export default defineComponent({
  name: 'Giscus',

  props: {
    options: {
      type: Object as PropType<GiscusProps>,
      default() {
        return {}
      },
    },
  },

  setup(props) {
    const { options } = toRefs(props)
    const lang = usePageLang()
    const theme = ref('light_tritanopia')

    onMounted(async () => {
      const fn = function() {
        const dark = document.documentElement.classList?.contains('dark')
        // @ts-ignore
        if(import.meta.env.PROD) {
          const baseUrl = window.location.protocol + '//' + window.location.host
          theme.value =  baseUrl + `/assets/giscus-theme${dark?'-dark':''}.css`
        } else {
          theme.value = getUrl(`../styles/giscus-theme${dark?'-dark':''}.css`)
        }
      }
      const mutationObserver = new MutationObserver(fn)
      mutationObserver.observe(document.documentElement, {
        attributes: true,
      })
      fn()
    }) 
    const giscusOption = computed(() => ({
      lang: lang.value || 'zh-CN',
      host: 'https://giscus.app',
      theme: theme.value,
      ...options.value,
    }))

    return (): VNode =>
      h(
        'div',
        {
          class: 'reco-giscus-wrapper',
        },
        h(Giscus, giscusOption.value)
      )
  },
})
