import { fs, path } from '@vuepress/utils'
import { md } from './md-instance/index.js'
import { analyzeDeps } from './analyze-deps/index.js'

let hasImportBlockOpen = false
let importMode = ''
let componentName = null
let importBlockIndex = 0
let resolveFileError = false

const root = process.cwd()

export const mdPluginVueVuePreview = function (md) {
  // 覆盖块标签-起始标签
  md.renderer.rules.paragraph_open = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const contentToken = tokens[idx + 1]
    // 先判断是不是预览 vue 组件
    let matchImportPattern =
      contentToken.type === 'inline' &&
      contentToken.content.match(/^@\[(preview)\]\((.+\/(.+).vue)\)/)

    // 再判断是不是代码组
    if (!matchImportPattern) {
      matchImportPattern =
        contentToken.type === 'inline' &&
        contentToken.content.match(/^@\[(code-group)\]\((.+)\)/)
    }

    // 都不是，就正常返回
    if (!matchImportPattern) {
      return self.renderToken(tokens, idx, options)
    }

    importMode = matchImportPattern[1]
    componentName = matchImportPattern[3]

    hasImportBlockOpen = true
    importBlockIndex = idx

    const filePath = matchImportPattern[2]

    const absoluteFilePath = _getAbsPath(filePath)

    if (!fs.existsSync(absoluteFilePath)) {
      resolveFileError = true
      return `<div class="custom-container warning"><p>未找到文件: ${absoluteFilePath}</p></div><!-- `
    }

    if (!/\.vue$/.test(absoluteFilePath)) {
      resolveFileError = true
      return `<div class="custom-container warning"><p>不支持非 vue 文件: ${filePath}</p></div><!-- `
    }

    resolveFileError = false

    if (importMode === 'preview') {
      return renderPreviewOpen({ filePath, absoluteFilePath })
    }

    if (importMode === 'code-group') {
      return renderCodeGroupOpen({ filePath, absoluteFilePath })
    }
  }

  // 覆盖块标签-结束标签
  md.renderer.rules.paragraph_close = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    if (hasImportBlockOpen && importBlockIndex + 2 === idx) {
      hasImportBlockOpen = false

      let template = ' -->'

      if (!resolveFileError) {
        if (importMode === 'preview') {
          template = '--></CodeGroup></VuePreview>'
        }

        if (importMode === 'code-group') {
          template = '--></CodeGroup>'
        }
      }

      return template
    }
    return self.renderToken(tokens, idx, options)
  }

  // 移除段落标签
  // md.renderer.rules.paragraph_close = md.renderer.rules.paragraph_open = doNotRenderTokenWhenBlockOpen
}

function renderPreviewOpen({ filePath, absoluteFilePath }) {
  let template = `<VuePreview component="${componentName}"><CodeGroup>`

  const deps = analyzeDeps(absoluteFilePath)

  const codeGroups = `${[absoluteFilePath]
    .concat(deps)
    .map((absPath, index) => {
      return `<CodeGroupItem title="${path.basename(absPath)}">
  ${md.render(`@[code](${absPath})`)}
  </CodeGroupItem>`
    })
    .join('')}`

  return template + codeGroups + '' + '<!-- '
}

function renderCodeGroupOpen({ filePath, absoluteFilePath }) {
  let template = '<CodeGroup>'

  const deps = analyzeDeps(absoluteFilePath)

  const codeGroups = `${[absoluteFilePath]
    .concat(deps)
    .map((absPath, index) => {
      return `<CodeGroupItem title="${path.basename(absPath)}">
  ${md.render(`@[code](${absPath})`)}
  </CodeGroupItem>`
    })
    .join('')}`

  return template + codeGroups + '' + '<!-- '
}

function _getAbsPath(path) {
  return path.trim().replace(/^@/, root).trim()
}

function doNotRenderTokenWhenBlockOpen(tokens, idx, options, env, self) {
  if (hasImportBlockOpen) {
    return ''
  }

  return self.renderToken(tokens, idx, options)
}
