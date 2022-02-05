import * as GlobalComponents from '@vuepress-reco/shared/lib/esm/components/global'

export function registerGlobalComponents(app) {
  Object.keys(GlobalComponents).forEach(key => {
    app.component(key, GlobalComponents[key])
  })
}
