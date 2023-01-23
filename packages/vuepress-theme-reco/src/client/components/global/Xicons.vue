<template>
  <a
    v-if="link !=='javascript:void(0)' || (text || slots.default)"
    :class="['xicon-container', iconPosition]"
    :href="link"
    :target="target"
  >
    <component
      class="xicon-svg"
      :style="iconStyle"
      :is="iconComponent"
    />

    <span
      class="xicon-content"
      v-if="text || slots.default"
      :style="textStyle"
    >
      <slot>{{ text }}</slot>
    </span>
  </a>

  <component
    v-else
    class="xicon-container"
    :style="iconStyle"
    :is="iconComponent"
  />
</template>

<script lang="ts" setup>
import { computed, toRefs, useSlots, defineProps } from 'vue'
import * as antd from '@vicons/antd'
import * as carbon from '@vicons/carbon'
import * as fa from '@vicons/fa'
import * as fluent from '@vicons/fluent'
import * as ionicons4 from '@vicons/ionicons4'
import * as ionicons5 from '@vicons/ionicons5'
import * as material from '@vicons/material'
import * as tabler from '@vicons/tabler'

const icons = { antd, carbon, fa, fluent, ionicons4, ionicons5, material, tabler }

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

const { icon, iconSize, color, textSize } = toRefs(props)

const iconComponent = computed(() => {
  if (typeof icon.value === 'string' && icon.value.split('.').length === 2) {
    const [category, name] = icon.value.split('.')
    return icons[category][name]
  } else {
    return icons.tabler.Alien
  }
})

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
