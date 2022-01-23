import * as GlobalComponents from '../components/global'

console.log(111, GlobalComponents)

export function registerGlobalComponents(app) {
  Object.keys(GlobalComponents).forEach(key => {
    app.component(key, GlobalComponents[key])
  })
}
