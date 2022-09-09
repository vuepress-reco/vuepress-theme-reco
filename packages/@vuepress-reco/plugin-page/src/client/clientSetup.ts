import { computed, provide } from 'vue'

declare const __POSTS__: Record<string, any[]>
declare const __CATEGORY_SUMMARY__: Record<string, any>
declare const __CATEGORY_PAGINATION_POSTS__: Record<string, any[]>

export async function applyClientSetup () {
  //@ts-ignore
  if (__VUEPRESS_SSR__) return

  provide('__POSTS__', __POSTS__);
    provide('__CATEGORY_SUMMARY__', __CATEGORY_SUMMARY__);
    provide('__CATEGORY_PAGINATION_POSTS__', __CATEGORY_PAGINATION_POSTS__);
}
