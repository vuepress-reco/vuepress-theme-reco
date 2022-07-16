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
.vue-preview-container {
  @apply relative my-6 overflow-hidden bg-reco-bg-lightmode-code rounded-md border border-solid border-reco-border-light;
  @apply dark:bg-reco-bg-darkmode-code dark:border-reco-border-dark;
  .preview-container {
    @apply py-4 border-b border-dashed border-reco-border-light;
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

.vue-preview-container .preview-container {
  @apply dark:border-reco-border-dark;
}
</style>
