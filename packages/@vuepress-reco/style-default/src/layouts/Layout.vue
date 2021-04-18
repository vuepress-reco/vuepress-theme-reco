<template>
  <div>
    <HomeBlog v-if="frontmatter.home === true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import HomeBlog from '../components/HomeBlog'

export default defineComponent({
  components: { HomeBlog },

  setup() {
    const frontmatter = usePageFrontmatter()
    return { frontmatter }
  },
})
</script>
