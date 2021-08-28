<template>
  <a :class="['icon-container', iconPosition]" :href="link">
    <svg :width="iconSize" :height="iconSize" :style="{ fill: iconColor }">
      <use :xlink:href="`${iconLink}`" />
    </svg>
    <span v-if="!!text || slots.default" :style="textStyle">
      <slot>{{ text }}</slot>
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'

enum EIconPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

type PropsType = {
  icon: string
  iconPosition: keyof typeof EIconPosition
  iconSize: number | string
  iconColor: string
  text: string
  textSize: number | string
  textColor: string
  link: string
}

export default defineComponent<PropsType>({
  name: 'Icon',

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
      default: 14,
    },
    iconColor: {
      type: String,
      default: '#888',
    },
    text: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '#888',
    },
    textSize: {
      type: [String, Number],
      default: '14',
    },
    link: {
      type: String,
      default: 'javascript:void(0)',
    },
  },

  setup(props, { slots }) {
    const { icon, textColor, textSize } = toRefs(props)

    const iconLink = computed(() => {
      const iconLinkArgs = icon.value.split(' ')
      return `${require(`@fortawesome/fontawesome-free/sprites/${iconLinkArgs[0]}.svg`)}#${
        iconLinkArgs[1]
      }`
    })

    const textStyle = computed(() => {
      return { color: textColor.value, fontSize: `${textSize.value}px` }
    })

    return { iconLink, textStyle, slots }
  },
})
</script>
