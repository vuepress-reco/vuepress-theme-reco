import { defineComponent, h, toRefs } from 'vue'
import { useComment } from '../composables'
import Valine from './Valine'
import Waline from './Waline'

export default defineComponent({
  name: 'RecoComments',
  components: { Valine, Waline },
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
      case 'waline':
      componentName = Waline
      break
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
