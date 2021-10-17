import { defineComponent, h } from 'vue'
import { useComment } from '../composables'
import Valine from './Valine'
import Vssue from './Vssue'

export default defineComponent({
  components: { Valine, Vssue },
  props: {
    isShowComments: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const { solution, options } = useComment()
    const componentName = solution.value === 'valine'
      ? Valine
      : solution.value === 'vssue'
      ? Vssue
      : ''

    return () => (componentName ? h(componentName, {
      options: options.value
    }) : null)
  }
})
