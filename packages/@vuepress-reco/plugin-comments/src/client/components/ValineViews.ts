import { defineComponent, toRefs, h, watch } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ValineViews',

  props: {
    idVal: String,
    numStyle: {
      type: Object,
      default: () => ({}),
    },
    flagTitle: {
      type: String,
      default: 'Your Article Title',
    },
  },

  setup(props) {
    const siteLocal = useSiteLocaleData()
    const route = useRoute()
    const { idVal, numStyle, flagTitle } = toRefs(props)

    const getIdVal = (path) => {
      return (
        siteLocal.value.base.slice(0, siteLocal.value.base.length - 1) + path
      )
    }

    return () =>
      h(
        'span',
        {
          'id': getIdVal(idVal.value || route.path),
          'class': 'leancloud-visitors',
          'data-flag-title': flagTitle.value,
        },
        h('a', {
          class: 'leancloud-visitors-count',
          style: numStyle.value,
        })
      )
  },
})
