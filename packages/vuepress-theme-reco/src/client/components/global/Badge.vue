<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: false,
    default: 'tip',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  vertical: {
    type: String,
    required: false,
    default: 'top',
  },
})
</script>

<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style>
.badge {
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  @apply text-white;

  &.tip {
    @apply bg-reco-primary;
  }

  &.warning {
    @apply bg-reco-container-warning;
  }

  &.danger {
    @apply bg-reco-container-danger;
  }

  & + & {
    margin-left: 5px;
  }
}
</style>
