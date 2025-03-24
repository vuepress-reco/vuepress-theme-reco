<template>
  <component
    :is="linkComponent"
    v-bind="componentProps"
  >
    <slot></slot>
  </component>
</template>

<script setup>
// 注意：我们有意使用普通JavaScript而非Typescript
// 这可以避免TS在编译期间检查导入的组件

import { h, shallowRef, computed } from 'vue'

// 安全地检测我们是否在服务器上
const isServer = typeof window === 'undefined'

// 使用 shallowRef 避免 Vue 深入解析导入的组件
const linkComponent = shallowRef('a')

// 这些属性将被传递给最终渲染的组件
const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  custom: {
    type: Boolean,
    default: false
  },
  replace: {
    type: Boolean,
    default: false
  },
  ariaCurrent: {
    type: String,
    default: 'page'
  }
})

// 计算出给组件的属性
const componentProps = computed(() => {
  if (isServer) {
    // 在服务器端，我们使用普通的a标签
    return {
      class: 'router-link-fallback',
      href: typeof props.to === 'string' ? props.to : '',
      ...props.$attrs
    }
  } else {
    // 在客户端，我们使用RouterLink的属性
    return {
      to: props.to,
      custom: props.custom,
      replace: props.replace,
      'aria-current': props.ariaCurrent,
      ...props.$attrs
    }
  }
})

// 只在客户端环境下动态导入和使用RouterLink
if (!isServer) {
  // 时间函数延迟运行，确保到了客户端才运行
  setTimeout(() => {
    try {
      // 动态导入RouterLink
      // 先尝试从 vuepress/client 中导入，这样在不同包管理器下都能正常工作
      import('vuepress/client').then(vuepress => {
        // 检查是否存在RouterLink
        if (vuepress.RouterLink) {
          linkComponent.value = vuepress.RouterLink
        }
      }).catch(e => {
        console.warn('SafeRouterLink: Failed to load RouterLink, using fallback link', e)
      })
    } catch (e) {
      console.warn('SafeRouterLink: Error importing RouterLink', e)
    }
  }, 0)
}
</script>
