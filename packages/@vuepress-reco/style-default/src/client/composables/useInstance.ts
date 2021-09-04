import { getCurrentInstance } from 'vue'

export function useInstance(): Record<string, any> {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm || {}
  return instance
}
