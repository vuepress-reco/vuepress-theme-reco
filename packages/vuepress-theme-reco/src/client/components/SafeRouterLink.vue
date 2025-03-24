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

import { shallowRef, computed, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vuepress/client'

// 安全地检测我们是否在服务器上
const isServer = typeof window === 'undefined'

// 获取路由实例
let router = null
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

  if (isServer) {
    // 在服务器端使用正常的a标签
    return {
      class: 'router-link-fallback',
      href: toPath,
      // 添加 onclick 防止默认行为
      onclick: 'return false;',
      ...props.$attrs
    }
  } else if (linkComponent.value === 'a') {
    // 在客户端但RouterLink还未加载完成时
    // 使用 a 标签并自己处理导航逻辑
    return {
      class: 'router-link-fallback',
      href: toPath,
      // 实现对点击事件的处理，阻止页面刷新但仍然能实现路由跳转
      onClick: (e) => {
        e.preventDefault(); // 阻止默认行为
        
        // 如果有路由实例，手动调用导航
        if (router) {
          const path = typeof props.to === 'string' ? props.to : 
                      (props.to && typeof props.to === 'object') ? props.to : '/';
          
          if (props.replace) {
            router.replace(path);
          } else {
            router.push(path);
          }
        } else {
          // 如果没有路由实例，回退到正常行为
          window.location.href = toPath;
        }
      },
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

// 在组件创建前就开始加载 RouterLink
onBeforeMount(() => {
  if (!isServer) {
    // 使用缓存避免重复导入RouterLink
    if (window.__ROUTER_LINK_LOADED__) {
      linkComponent.value = window.__ROUTER_LINK_COMPONENT__
      return
    }

    // 使用立即执行的异步函数
    (async () => {
      try {
        // 使用 await 等待导入完成
        const vuepress = await import('vuepress/client')
        if (vuepress.RouterLink) {
          // 缓存RouterLink组件引用
          window.__ROUTER_LINK_COMPONENT__ = vuepress.RouterLink
          window.__ROUTER_LINK_LOADED__ = true
          linkComponent.value = vuepress.RouterLink
        }
      } catch (e) {
        console.warn('SafeRouterLink: Failed to load RouterLink, using fallback link', e)
      }
    })();
  }
})

// 也保留 onMounted 钩子，确保 RouterLink 被正确加载
onMounted(() => {
  if (!isServer && !window.__ROUTER_LINK_LOADED__) {
    // 如果 onBeforeMount 没有成功加载，再次尝试
    setTimeout(() => {
      if (window.__ROUTER_LINK_LOADED__) {
        linkComponent.value = window.__ROUTER_LINK_COMPONENT__
      }
    }, 0)
  }
})
</script>
