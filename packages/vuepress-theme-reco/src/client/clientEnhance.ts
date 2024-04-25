import '@utils/resolveStyles.js'
import { registerGlobalComponents, resolveSearchComponent } from '@utils/index.js'

export function applyClientEnhance({ app }) {
  registerGlobalComponents(app)
  resolveSearchComponent(app)
}
