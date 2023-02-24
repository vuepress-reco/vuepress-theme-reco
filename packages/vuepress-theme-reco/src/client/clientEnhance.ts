import { registerGlobalComponents, resolveSearchComponent } from './utils'
import './utils/resolveStyles'

export function applyClientEnhance({ app }) {
  registerGlobalComponents(app)
  resolveSearchComponent(app)
}
