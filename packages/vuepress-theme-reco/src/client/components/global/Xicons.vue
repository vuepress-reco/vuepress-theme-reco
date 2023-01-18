<template>
  <a v-if="link" :class="['icon-container', iconPosition]" :href="link" :target="target">
    <component v-if="icon" :style="iconStyle" :is="icons[icon]" />

    <span v-if="text || slots.default" :style="textStyle" class="icon-text">
      <slot>{{ text }}</slot>
    </span>
  </a>
  <component v-else class="icon-container" :style="iconStyle" :is="icons[icon]" />
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
      default: '',
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
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
  },

  setup(props, { slots }) {
    const { icon, iconSize, iconColor, textColor, textSize } = toRefs(props)

    const iconStyle = computed(() => {
      const style = { width: `${iconSize.value}px`, height: `${iconSize.value}px`, fontSize: `${iconSize.value}px` }

      if (iconColor.value) {
        style.color = iconColor.value
      }

      return style
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
    > .icon-text {
      @apply ml-1.5;
    }
  }
  &.right {
    @apply flex-row-reverse items-center;
    > .icon-text {
      @apply mr-1.5;
    }
  }
  &.top {
    @apply flex-col items-center;
    > .icon-text {
      @apply mt-1.5;
    }
  }
  &.bottom {
    @apply flex-col-reverse items-center;
    > .icon-text {
      @apply mb-1.5;
    }
  }
}
</style>
