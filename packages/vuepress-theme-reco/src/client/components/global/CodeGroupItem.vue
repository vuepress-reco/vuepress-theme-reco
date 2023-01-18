<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeGroupItem',
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>

<style>
.code-group-item {
  @apply hidden border-t border-dashed border-reco-border-lightmode;
  @apply dark:border-reco-border-darkmode;
  margin-top: -1px;
  &.code-group-item__active {
    @apply block;
  }
  div[class*="language-"] {
    @apply mt-0 mb-0 border-none;
  }
  .line-numbers {
    @apply pb-4 !important;
  }
}
</style>
