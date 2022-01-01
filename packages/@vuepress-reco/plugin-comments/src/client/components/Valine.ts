import { defineComponent, onMounted, toRefs, h } from 'vue'
import { useRoute } from 'vue-router'
import '../styles/valine.css'

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

    const initValine = async () => {
      const { default: Valine } = await import('valine')
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

      new Valine(valineOptions)
    }

    onMounted(() => {
      initValine()
    })

    return { initValine }
  },

  render() {
    return h('div', {
      class: 'reco-valine-wrapper'
    }, h('div', {
      id: 'valine'
    }))
  },

  watch: {
    '$route' (from, to) {
      if (to.path !== from.path) {
        // 切换页面时刷新评论
        setTimeout(() => {
          this.initValine()
        }, 300)
      }
    }
  }
})
