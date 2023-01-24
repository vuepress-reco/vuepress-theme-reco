<template>
  <a
    v-if="link !=='javascript:void(0)' || (text || slots.default)"
    :class="['xicon-container', iconPosition]"
    :href="link"
    :target="target"
    @click="emits('click')"
  >
    <slot name="icon">
      <component
        class="xicon-icon"
        :style="iconStyle"
        :is="icons[icon]"
      />
    </slot>

    <span
      class="xicon-content"
      v-if="text || slots.default"
      :style="textStyle"
    >
      <slot>{{ text }}</slot>
    </span>
  </a>

  <a v-else class="xicon-container">
    <component
      :style="iconStyle"
      :is="icons[icon]"
      @click="emits('click')"
    />
  </a>

</template>

<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue'
import { withBase } from '@vuepress/client'
import * as icons from '@vicons/carbon'

const slots = useSlots()

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String,
    default: 'left',
  },
  iconSize: {
    type: [String, Number],
    default: 18,
  },
  color: {
    type: String,
    default: 'inherit',
  },
  text: {
    type: String,
    default: '',
  },
  textSize: {
    type: [String, Number],
    default: '14',
  },
  link: {
    type: String,
    default: 'javascript:void(0)',
  },
  target: {
    type: String,
    default: '_self',
  },
})

const emits = defineEmits(['click'])

const { icon, iconSize, color, textSize } = toRefs(props)

const iconStyle = computed(() => {
  const style: Record<string, any> = {
    width: `${iconSize.value}px`,
    height: `${iconSize.value}px`,
    fontSize: `${iconSize.value}px`,
    color: color.value
  }

  return style
})

const textStyle = computed(() => {
  return { color: color.value, fontSize: `${textSize.value}px` }
})
</script>

<style>
.xicon-container {
  @apply inline-flex;
  &.left {
    @apply flex-row items-center;
    > .xicon-content {
      @apply ml-1.5;
    }
  }
  &.right {
    @apply flex-row-reverse items-center;
    > .xicon-content {
      @apply mr-1.5;
    }
  }
  &.top {
    @apply flex-col items-center;
    > .xicon-content {
      @apply mt-1.5;
    }
  }
  &.bottom {
    @apply flex-col-reverse items-center;
    > .xicon-content {
      @apply mb-1.5;
    }
  }
}
</style>
