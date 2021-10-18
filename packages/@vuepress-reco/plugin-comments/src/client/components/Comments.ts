import { defineComponent, h, toRefs } from 'vue'
import { useComment } from '../composables'
import Valine from './Valine'
import Vssue from './Vssue'

export default defineComponent({
  components: { Valine, Vssue },
  props: {
    hideComments: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { solution, options } = useComment()
    const { hideComments } = toRefs(props)
    const componentName = solution.value === 'valine'
      ? Valine
      : solution.value === 'vssue'
      ? Vssue
      : ''

    return () => (componentName ? h(componentName, {
      options: options.value,
      style: `display: ${hideComments.value ? 'none' : 'block'}`
    }) : null)
  }
})
