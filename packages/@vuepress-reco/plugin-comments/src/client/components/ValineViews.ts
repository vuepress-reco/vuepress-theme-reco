import { useSiteData } from '@vuepress/client'
import { defineComponent, toRefs, h } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ValineViews',

  props: {
    idVal: {
      type: String,
      default: '',
    },
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
    const siteDate = useSiteData()
    const { path } = useRoute()
    console.log(path)
    const { idVal, numStyle, flagTitle } = toRefs(props)

    const getIdVal = (path): string => {
      return siteDate.value.base.slice(0, siteDate.value.base.length - 1) + path
    }

    return () =>
      h(
        'span',
        {
          'id': getIdVal(idVal.value || path),
          'class': 'leancloud-visitors',
          'data-flag-title': flagTitle.value,
        },
        h('a', {
          class: 'leancloud-visitors-count',
          style: numStyle.value,
        })
      )
    // return () => h('span', '123')
  },
})
