import { defineComponent, h, toRefs } from 'vue'
import { useComment } from '../composables'
import Valine from './Valine'
import Waline from './Waline'
import Giscus from './Giscus'

export default defineComponent({
  name: 'RecoComments',
  components: { Valine, Waline, Giscus },
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
      case 'giscus':
      componentName = Giscus
      break
      default:
        componentName = ''
        break
    }

    return () => {
      if (componentName) {
        if (hideComments.value) {
          if (solution.value === 'valine') {
            return h(componentName, {
              options: options.value,
              style: 'display: none',
            })
          }
          return null
        }
        return h(componentName, {
          options: options.value,
        })
      }
      return null
    }
  },
})
