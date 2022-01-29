<template>
  <div class="vue-preview-container">
    <div class="preview-container" v-if="component !== undefined">
      <component :is="component" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['component'])
</script>
