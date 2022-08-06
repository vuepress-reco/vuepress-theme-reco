<template>
  <a v-if="!!text || slots.default" :class="['icon-container', iconPosition]" :href="link" :target="target">
    <component v-if="icon" :style="iconStyle" :is="icons[icon]" />

    <span :style="textStyle">
      <slot>{{ text }}</slot>
    </span>
  </a>
  <component v-else :style="iconStyle" :is="icons[icon]" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import type { Component } from 'vue'
import * as tablerIcons from '@vicons/tabler'
import * as faIcons from '@vicons/fa'

const icons = { ...faIcons, ...tablerIcons }

enum EIconPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

type PropsType = {
  icon: Component
  iconPosition: keyof typeof EIconPosition
  iconSize: number | string
  iconColor: string
  text: string
  textSize: number | string
  textColor: string
  link: string
}

export default defineComponent<PropsType>({
  name: 'Xicons',

  props: {
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
    iconColor: {
      type: String,
      default: 'inherit',
    },
    text: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: 'inherit',
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
  },

  setup(props, { slots }) {
    const { icon, iconSize, iconColor, textColor, textSize } = toRefs(props)

    const iconStyle = computed(() => {
      return { color: iconColor.value, width: `${iconSize.value}px`, height: `${iconSize.value}px`, fontSize: `${iconSize.value}px` }
    })

    const textStyle = computed(() => {
      return { color: textColor.value, fontSize: `${textSize.value}px` }
    })

    return { icon, iconStyle, textStyle, slots, icons }
  },
})
</script>

<style>
.icon-container {
  @apply inline-flex;
  &.left {
    @apply flex-row items-center;
    > svg {
      @apply mr-1.5;
    }
  }
  &.right {
    @apply flex-row-reverse items-center;
    > span {
      @apply mr-1.5;
    }
  }
  &.top {
    @apply flex-col items-center;
    > span {
      @apply mt-1.5;
    }
  }
  &.bottom {
    @apply flex-col-reverse items-center;
    > span {
      @apply mb-1.5;
    }
  }
}
</style>
