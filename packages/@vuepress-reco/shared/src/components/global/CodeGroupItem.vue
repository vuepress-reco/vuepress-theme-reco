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
  @apply hidden border-t border-solid border-reco-border-light;
  @apply dark:border-reco-border-dark;
  margin-top: -1px;
  &.code-group-item__active {
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
