<template>
  <div
    class="tab-item"
    :class="{ 'tab-item__active': active }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const { title, active } = toRefs(props)
</script>

<style>
@import url('@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css');

.tab-item {
  @apply hidden border-block border-0 border-t border-dashed p-4;
  margin-top: -1px;
  &.tab-item__active {
    @apply block;
  }
  div[class*="language-"] {
    @apply border-none;
    &::after {
      @apply hidden;
    }
    pre[class*="language-"] {
      @apply mb-0 pt-0 pb-4 border-t-0 !important;
    }
  }
  .line-numbers {
    @apply pb-4 !important;
  }
}
</style>
