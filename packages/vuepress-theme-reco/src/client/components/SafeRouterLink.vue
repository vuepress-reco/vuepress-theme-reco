<template>
  <!-- 添加preventDefault防止a标签默认行为，避免页面闪白 -->
  <component
    :is="linkComponent"
    v-bind="componentProps"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>

<script setup>
// 注意：我们有意使用普通JavaScript而非Typescript
// 这可以避免TS在编译期间检查导入的组件

import { shallowRef, computed, ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vuepress/client'

// 安全地检测我们是否在服务器上
const isServer = typeof window === 'undefined'
let router = null

// 标记RouterLink是否已经加载完成
const routerLinkLoaded = ref(false)

// 获取路由实例
if (!isServer) {
  try {
    router = useRouter()
  } catch (e) {
    console.warn('SafeRouterLink: Error getting router instance', e)
  }
}

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
  // 处理对象形式的 to 属性，确保在使用 a 标签时有正确的 href
  const toPath = typeof props.to === 'string'
    ? props.to
    : (props.to && typeof props.to === 'object' && props.to.path)
      ? props.to.path
      : '/'

  if (isServer || linkComponent.value === 'a') {
    // 在服务器端或当仍然使用 a 标签时
    return {
      class: 'router-link-fallback',
      href: toPath,
      ...props.$attrs
    }
  } else {
    // 在客户端且RouterLink已加载，使用RouterLink的属性
    return {
      to: props.to,
      custom: props.custom,
      replace: props.replace,
      'aria-current': props.ariaCurrent,
      ...props.$attrs
    }
  }
})

// 处理点击事件
const handleClick = (e) => {
  // 如果还在使用a标签时，防止默认行为并用编程式跳转
  if (linkComponent.value === 'a' && router) {
    e.preventDefault()
    const toPath = typeof props.to === 'string'
      ? props.to
      : (props.to && typeof props.to === 'object' && props.to.path)
        ? props.to.path
        : '/'

    // 使用router导航而非页面刷新
    if (props.replace) {
      router.replace(props.to)
    } else {
      router.push(props.to)
    }
  }
}

// 提前在组件挂载前就开始加载 RouterLink
onBeforeMount(() => {
  if (!isServer) {
    loadRouterLink()
  }
})

// 定义加载 RouterLink 的函数
const loadRouterLink = () => {
  // 使用缓存避免重复导入RouterLink
  if (window.__ROUTER_LINK_LOADED__) {
    linkComponent.value = window.__ROUTER_LINK_COMPONENT__
    routerLinkLoaded.value = true
    return
  }

  try {
    import('vuepress/client').then(vuepress => {
      if (vuepress.RouterLink) {
        // 缓存RouterLink组件引用
        window.__ROUTER_LINK_COMPONENT__ = vuepress.RouterLink
        window.__ROUTER_LINK_LOADED__ = true
        linkComponent.value = vuepress.RouterLink
        routerLinkLoaded.value = true
      }
    }).catch(e => {
      console.warn('SafeRouterLink: Failed to load RouterLink, using fallback link', e)
    })
  } catch (e) {
    console.warn('SafeRouterLink: Error importing RouterLink', e)
  }
}

// 确保组件挂载后也尝试加载 RouterLink
onMounted(() => {
  if (!isServer && !routerLinkLoaded.value) {
    loadRouterLink()
  }
})
</script>
