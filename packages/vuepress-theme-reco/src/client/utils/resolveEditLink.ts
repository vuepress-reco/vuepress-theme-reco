import {
  isLinkHttp,
  removeLeadingSlash,
  removeEndingSlash,
} from 'vuepress/shared'
import { resolveRepoType } from './resolveRepoType.js'
import type { RepoType } from './resolveRepoType.js'

export const editLinkPatterns: Record<Exclude<RepoType, null>, string> = {
  GitHub: ':repo/edit/:branch/:path',
  GitLab: ':repo/-/edit/:branch/:path',
  Gitee: ':repo/edit/:branch/:path',
  Bitbucket:
    ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default',
}

export const resolveEditLink = ({
  gitRepo,
  gitBranch,
  sourceDir,
  filePathRelative,
  editLinkPattern,
}: {
  gitRepo: string
  gitBranch: string
  sourceDir: string
  filePathRelative: null | string
  editLinkPattern?: string
}): string | null => {
  const repoType = resolveRepoType(gitRepo)

  let pattern: string | undefined

  if (editLinkPattern) {
    pattern = editLinkPattern
  } else if (repoType !== null) {
    pattern = editLinkPatterns[repoType]
  }

  if (!pattern) return null

  return pattern
    .replace(
      /:repo/,
      isLinkHttp(gitRepo) ? gitRepo : `https://github.com/${gitRepo}`
    )
    .replace(/:branch/, gitBranch)
    .replace(
      /:path/,
      removeLeadingSlash(`${removeEndingSlash(sourceDir)}/${filePathRelative}`)
    )
}

// export const resolveEditLink = ({
//   gitRepo,
//   gitBranch,
//   sourceDir,
//   filePathRelative,
//   editLinkPattern,
// }: {
//   gitRepo: string
//   gitBranch: string
//   sourceDir: string
//   filePathRelative: string | null
//   editLinkPattern?: string
// }): string | null => {
//   if (!filePathRelative) return null

//   const pattern = resolveEditLinkPatterns({ gitRepo, editLinkPattern })
//   if (!pattern) return null

//   return pattern
//     .replace(
//       /:repo/,
//       isLinkHttp(gitRepo) ? gitRepo : `https://github.com/${gitRepo}`
//     )
//     .replace(/:branch/, gitBranch)
//     .replace(
//       /:path/,
//       removeLeadingSlash(`${removeEndingSlash(sourceDir)}/${filePathRelative}`)
//     )
// }
