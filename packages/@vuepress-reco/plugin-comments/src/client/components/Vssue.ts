import { defineComponent, onMounted, toRefs, watch, ref , computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import GithubV4 from '@vssue/api-github-v4'
import GitlabV3 from '@vssue/api-gitlab-v4'
import BitbucketV2 from '@vssue/api-bitbucket-v2'
import GiteeV5 from '@vssue/api-gitee-v5'
import 'vssue/dist/vssue.css'

type TvssueOptions = {
  platform?: 'github' | 'github-v4' | 'gitlab' | 'bitbucket' | 'gitee',
  [prop: string]: any
}

type Tprops = {
  options: TvssueOptions
}

export default defineComponent({
  name: 'Vssue',

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

    const key = ref('key')
    const platformOptions = {
      'github': GithubV3,
      'github-v4': GithubV4,
      'gitlab': GitlabV3,
      'bitbucket': BitbucketV2,
      'gitee': GiteeV5
    }

    const vssueOptions = computed(() => {
      const platform = platformOptions[options.value.platform || 'github']
      return { ...options.value, api: platform }
    })

    onMounted(() => {
      key.value = `reco-${new Date().getTime()}`
    })

    watch(route, (to, from) => {
      if (to.path !== from.path) {
        // 切换页面时刷新评论
        setTimeout(() => {
          key.value = `reco-${new Date().getTime()}`
        }, 300)
      }
    })

    return () => h(VssueComponent, {
      class: 'reco-vssue-wrapper',
      options: vssueOptions.value
    })
  }
})
