import { defineComponent, h, toRefs } from 'vue'
import { useComment } from '../composables'
import Valine from './Valine'
// Tip: 因为 esModel 报错，暂时移除 Waline
// import Waline from './Waline'

export default defineComponent({
  name: 'RecoComments',
  components: { Valine },
  props: {
    hideComments: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { solution, options } = useComment()
    const { hideComments } = toRefs(props)

    let componentName
    switch (solution.value) {
      case 'valine':
        componentName = Valine
        break
      // case 'waline':
      // componentName = Waline
      // break
      default:
        componentName = ''
        break
    }

    return () =>
      componentName
        ? h(componentName, {
            options: options.value,
            style: `display: ${hideComments.value ? 'none' : 'block'}`,
          })
        : null
  },
})
