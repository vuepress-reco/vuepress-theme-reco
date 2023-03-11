import type { LocaleData } from '@vuepress/shared'
import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { NavbarConfig, SeriesConfig } from './nav'

export type RecoThemeData = ThemeData<RecoThemeLocaleData>

export interface RecoThemeLocaleData extends LocaleData {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string

  colorMode?: 'light' | 'dark'

  password?: string | Array<string>

  /**
   * Navbar config
   *
   * Set to `false` to disable navbar in current locale
   */
  navbar?: false | NavbarConfig

  /**
   * Navbar logo config
   *
   * Logo to display in navbar
   */
  logo?: null | string

  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: null | string

  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: string

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string

  /**
   * Series config
   *
   * Set to `false` to disable series in current locale
   */
  series?: false | SeriesConfig

  /**
   * Page meta - edit link config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean

  /**
   * Page meta - edit link config
   *
   * The text to replace the default "Edit this page"
   */
  editLinkText?: string

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Page meta - edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'master'
   */
  docsBranch?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string

  /**
   * Page meta - last updated config
   *
   * Whether to show "Last Updated" or not
   */
  lastUpdated?: boolean

  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   */
  lastUpdatedText?: string
}
