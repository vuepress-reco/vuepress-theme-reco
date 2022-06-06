import { defineComponent, onMounted, toRefs, h } from 'vue'
import { useRoute } from 'vue-router'
import '../styles/valine.css'
import { Valine } from './reco-valine.js'

type TvalineOptions = Record<string, unknown>

type Tprops = {
  options: TvalineOptions
}

export default defineComponent({
  name: 'Valine',

  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  setup(props: Tprops) {
    const route = useRoute()
    const { options } = toRefs(props)

    onMounted(() => {
      const initValine = async () => {
        // @ts-ignore
        const valineOptions = {
          el: '#valine',
          placeholder: 'just go go',
          notify: false,
          verify: false,
          avatar: 'retro',
          visitor: true,
          recordIP: false,
          path: window.location.pathname,
          ...options.value
        }

        // @ts-ignore
        new Valine(valineOptions)
      }

      initValine()
    })
  },

  render() {
    return h('div', {
      class: 'reco-valine-wrapper'
    }, h('div', {
      id: 'valine'
    }))
  },

  // watch: {
  //   '$route' (from, to) {
  //     if (to.path !== from.path) {
  //       // 切换页面时刷新评论
  //       setTimeout(() => {
  //         // this.initValine()
  //       }, 300)
  //     }
  //   }
  // }
})
