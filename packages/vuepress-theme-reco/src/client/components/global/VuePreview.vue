<template>
  <div class="vue-preview-container">
    <div class="preview-container" v-if="component !== 'undefined'">
      <component :is="component" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['component'])
</script>

<style>
@import url('@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css');

.vue-preview-container {
  @apply relative my-6 overflow-hidden bg-block border-block;
  .preview-container {
    @apply py-4 border-b border-dashed border-reco-border-lightmode;
    @apply dark:border-reco-border-darkmode;
    & > * {
      @apply mx-auto;
    }
  }
  .code-group {
    @apply pr-0 py-0 my-0 border-none;
    &::after {
      @apply hidden;
    }
  }
}
</style>
