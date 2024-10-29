<template>
  <span
    v-if="link !=='javascript:void(0)' || (text || slots.default)"
    :class="['xicon-container', iconPosition]"
    @click="handleClick"
  >
    <slot name="icon">
      <component
        class="xicon-icon"
        :style="iconStyle"
        :is="icon"
      />
    </slot>

    <span
      class="xicon-content"
      v-if="text || slots.default"
      :style="textStyle"
    >
      <slot>{{ text }}</slot>
    </span>
  </span>

  <span v-else class="xicon-container">
    <component
      :style="iconStyle"
      :is="icon"
      @click="emits('click')"
    />
  </span>

</template>

<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  icon: [Object, String],
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
    default: '',
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

const { icon, iconPosition, iconSize, color, textSize } = toRefs(props)

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

const handleClick = () => {
  if (props.link) {
    window.open(props.link, props.target)
  }

  emits('click')
}
</script>

<style>
.xicon-container {
  @apply inline-flex cursor-pointer;
  .xicon-content {
    @apply text-nowrap;
  }
  &.left {
    @apply flex-row items-center;
    > svg {
      @apply mr-1.5;
    }
  }
  &.right {
    @apply flex-row-reverse items-center;
    > svg {
      @apply ml-1.5;
    }
  }
  &.top {
    @apply flex-col items-center;
    > svg {
      @apply mb-1.5;
    }
  }
  &.bottom {
    @apply flex-col-reverse items-center;
    > svg {
      @apply mt-1.5;
    }
  }
}
</style>
