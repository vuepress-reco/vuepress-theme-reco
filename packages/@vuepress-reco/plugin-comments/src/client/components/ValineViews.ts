import { defineComponent, toRefs, h } from 'vue'
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
    const route = useRoute()
    const { idVal, numStyle, flagTitle } = toRefs(props)

    return () =>
      h(
        'span',
        {
          'id': idVal.value || route.path,
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
