import { useRouter } from 'vuepress/client'
import { onMounted, onUnmounted } from 'vue'
import { useScrollDirection } from '@composables/index.js'

// 定义简化的Router类型
// 这里仅定义我们需要的最小属性集合

interface RouteLocation {
  path: string;
  [key: string]: any;
}

interface RouterType {
  afterEach: (callback: (to: RouteLocation, from: RouteLocation) => void) => (() => void);
  [key: string]: any;
}

export function useSeries() {
  let unregisterRouterHook: (() => void) | null = null;
  
  // 提供一个默认的降级实现
  let router: RouterType = {
    afterEach: (callback) => {
      // 记录注册的回调，但不实际执行任何路由变化
      // 返回一个空函数作为unregister
      return () => {
        // 空函数作为unregister
      };
    }
  };

  // 确保SSR期间不调用useRouter
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    try {
      // 只在客户端环境下调用useRouter
      const clientRouter = useRouter();
      if (clientRouter && typeof clientRouter.afterEach === 'function') {
        router = clientRouter;
      }
    } catch (e) {
      console.warn('Failed to use router, using fallback implementation', e);
    }
  } else {
    // 服务器端渲染环境
  }

  const initSeriesStatus = (cb: () => void) => {
    // 在SSR期间此函数不应执行任何与路由相关的操作
    if (typeof window === 'undefined') {
      return;
    }
    
    onMounted(() => {
      try {
        const { direction } = useScrollDirection();
        
        // 只在客户端环境注册路由钩子
        
        // 使用router (在客户端环境已初始化)
        unregisterRouterHook = router.afterEach((to, from) => {
          // 增加健壮性检查
          if (to && from && typeof to.path === 'string' && typeof from.path === 'string' && to.path !== from.path) {
            cb();
            
            if (direction && typeof direction.value !== 'undefined') {
              direction.value = '';
            }
          }
        });
      } catch (e) {
        console.warn('Error in initSeriesStatus', e);
      }
    });

    onUnmounted(() => {
      if (typeof unregisterRouterHook === 'function') {
        try {
          unregisterRouterHook();
          unregisterRouterHook = null;
        } catch (e) {
          console.warn('Error when unregistering router hook', e);
        }
      }
    });
  };

  return { initSeriesStatus };
}
