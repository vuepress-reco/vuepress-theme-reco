<template>
  <GenericContainer>
    <Home v-if="frontmatter.home === true" />

    <!-- <Transition
      v-else
      name="fade-slide-y"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
    >
      <Page :key="page.path" />
    </Transition> -->
    <Page v-else :key="page.path" />
  </GenericContainer>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'

import Home from '@components/Home/index.vue'
import Page from '@components/Page/index.vue'
import GenericContainer from '@components/GenericContainer/index.vue'
import {
  usePageData,
  useMagicCard,
  useScrollPromise,
} from '@composables/index.js'
import { RecoThemeHomePageFrontmatter } from '../../types'

const page = usePageData()
const frontmatter = usePageFrontmatter<RecoThemeHomePageFrontmatter>()

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending

const { initMagicCard } = useMagicCard()
onMounted(() => {
  initMagicCard()
})

const route = useRoute()
watch(route, () => {
  initMagicCard()
})
</script>
@client/components/GenericContainer/index.vue
