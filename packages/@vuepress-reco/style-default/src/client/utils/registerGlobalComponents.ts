import * as GlobalComponents from '../components/global'

export function registerGlobalComponents(app) {
  Object.keys(GlobalComponents).forEach(key => {
    app.component(key, GlobalComponents[key])
  })
}
