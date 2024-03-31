import { registerGlobalComponents, resolveSearchComponent } from './utils/index.js'
import './utils/resolveStyles.js'

export function applyClientEnhance({ app }) {
  registerGlobalComponents(app)
  resolveSearchComponent(app)
}
