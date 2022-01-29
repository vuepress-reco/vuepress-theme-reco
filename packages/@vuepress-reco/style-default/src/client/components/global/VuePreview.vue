<template>
  <div class="vue-preview-container">
    <div class="preview-container">
      <component v-if="component" :is="component" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['component'])
</script>
