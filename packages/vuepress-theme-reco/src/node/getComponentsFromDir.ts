import { globby, path } from 'vuepress/utils'

/**
 * Options for @vuepress/plugin-register-components
 */
export interface RegisterComponentsPluginOptions {
  /**
   * An object that defines name of components and their corresponding file path
   */
  components?: Record<string, string>

  /**
   * Absolute path to the components directory
   */
  componentsDir?: string | null

  /**
   * Patterns to match component files using [globby](https://github.com/sindresorhus/globby)
   *
   * The patterns are relative to componentsDir`
   */
  componentsPatterns?: string[]

  /**
   * A function to get component name from the filename
   */
  getComponentName?: (filename: string) => string
}

export const getComponentsFromDir = async ({
  componentsDir,
  componentsPatterns = ['**/*.vue'],
  getComponentName = (filename) =>
    path.trimExt(filename.replace(/\/|\\/g, '-')),
}: Omit<Required<RegisterComponentsPluginOptions>, 'components'>): Promise<
  Record<string, string>
> => {
  if (!componentsDir) {
    return {}
  }

  // get all matched component files
  const componentsDirFiles = await globby(componentsPatterns, {
    cwd: componentsDir,
  })

  // transform files to name => filepath map
  return Object.fromEntries(
    componentsDirFiles.map((filename) => [
      getComponentName(filename),
      path.resolve(componentsDir, filename),
    ]),
  )
}
