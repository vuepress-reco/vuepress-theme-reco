import { fs, path } from '@vuepress/utils'
import * as resolve from 'enhanced-resolve'
import slash from 'slash2'

const DEFAULT_EXT = ['.tsx', '.jsx', '.js', '.ts', '.vue']

export function getModuleResolvePath({
  basePath,
  sourcePath,
  extensions = DEFAULT_EXT,
  silent = null,
}) {
  try {
    return slash(
      // @ts-ignore
      resolve.default.create.sync({
        extensions,
        symlinks: false,
        mainFiles: ['index', 'package.json'],
      })(
        fs.statSync(basePath).isDirectory()
          ? basePath
          : path.parse(basePath).dir,
        sourcePath
      )
    )
  } catch (err) {
    if (!silent) {
      console.info(
        '[THEME RECO TIP] ',
        `cannot resolve module ${sourcePath} from ${basePath}`
      )
    }

    return null
  }
}
