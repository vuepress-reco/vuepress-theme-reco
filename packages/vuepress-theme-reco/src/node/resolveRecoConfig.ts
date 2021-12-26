import { fs, path } from '@vuepress/utils'

// 获取 reco.config.js 的绝对路径
export const resolveRecoConfigPath = (
  cwd = process.cwd()
): string | undefined => {
  const recoConfigPath = [
    path.resolve(cwd, 'reco.config.ts'),
    path.resolve(cwd, 'reco.config.js'),
  ].find((item) => fs.pathExistsSync(item))

  if (!recoConfigPath) {
    console.error(
      'THEME RECO ERROR: ',
      'Please add reco.config.js in root path.'
    )
  }

  return recoConfigPath
}

// 获取 reco.config.js 的内容
export const resolveRecoConfig = (
  path: string | undefined
): Record<string, any> => {
  if (path === undefined) return {}
  return require(path) || {}
}
