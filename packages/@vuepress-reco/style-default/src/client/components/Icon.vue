<template>
  <a :class="['icon-container', iconPosition]" :href="link">
    <svg :width="iconSize" :height="iconSize" :style="{ fill: color }">
      <use :xlink:href="`${iconLink}`" />
    </svg>
    <span v-if="!!text">{{ text }}</span>
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
  iconSize: number
  color: string
  text: string
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
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: '#000000',
    },
    text: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { icon } = toRefs(props)

    const iconLink = computed(() => {
      const iconLinkArgs = icon.value.split(' ')
      return `${
        require(`@fortawesome/fontawesome-free/sprites/${iconLinkArgs[0]}.svg`)
          .default
      }#${iconLinkArgs[1]}`
    })

    return { iconLink }
  },
})
</script>
