import { fs, path } from '@vuepress/utils'
const { createMarkdown } = require('@vuepress/markdown')

const md = createMarkdown()

const { analyzeDeps } = require('./analyze-deps/index.js')

let hasImportBlockOpen = false
let importMode = ''
let importBlockIndex = 0

const root = process.cwd()

function _getAbsPath(path) {
  return path
    .trim()
    .replace(/^@/, root)
    .trim()
}

function doNotRenderTokenWhenBlockOpen(tokens, idx, options, env, self) {
  if (hasImportBlockOpen) {
    return ''
  }

  return self.renderToken(tokens, idx, options)
}

export const mdPluginVueVuePreview = function(md) {
  // 覆盖块标签-起始标签
  md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
    const contentToken = tokens[idx + 1]
    const matchImportPattern =
      contentToken.type === 'inline' && contentToken.content.match(/^@\[(preview)\]\((.+)\)/)

    if (!matchImportPattern) {
      return self.renderToken(tokens, idx, options)
    }

    importMode = matchImportPattern[1]

    hasImportBlockOpen = true
    importBlockIndex = idx

    const filePath = matchImportPattern[2]

    const absoluteFilePath = _getAbsPath(filePath)

    if (!fs.existsSync(absoluteFilePath)) {
      return `<div class="custom-block warning"><p>未找到文件: ${absoluteFilePath}</p></div><!-- `
    }

    if (!/\.vue$/.test(absoluteFilePath)) {
      return `<div class="custom-block warning"><p>不支持非 vue 文件: ${filePath}</p></div><!-- `
    }

    if (importMode === 'preview') {
      return renderDemoOpen({ filePath, absoluteFilePath })
    }
  }

  // 覆盖块标签-结束标签
  md.renderer.rules.paragraph_close = function(tokens, idx, options, env, self) {
    if (importMode === 'preview' && hasImportBlockOpen && (importBlockIndex + 2) === idx) {
      return '--></CodeGroup>'
    }
    return self.renderToken(tokens, idx, options)
  }

  // 移除段落标签
  // md.renderer.rules.paragraph_close = md.renderer.rules.paragraph_open = doNotRenderTokenWhenBlockOpen
}

function renderDemoOpen({ filePath, absoluteFilePath }) {
  let template = '<CodeGroup>'

  const deps = analyzeDeps(absoluteFilePath)

    if (!deps.length) {
      return (
        template +
        `
  ${md.render(`@[code](${absoluteFilePath})`)}
  `)
    }

      const codeGroups = `${[absoluteFilePath]
        .concat(deps)
        .map((absPath, index) => {
          return `<CodeGroupItem title="${path.basename(absPath)}">
      ${md.render(`@[code](${absPath})`)}
      </CodeGroupItem>`
        })
        .join('')}`

  return template + codeGroups + '' + '<!-- '


  return template
}
