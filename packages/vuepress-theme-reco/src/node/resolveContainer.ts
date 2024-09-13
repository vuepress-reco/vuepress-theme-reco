import { ensureLeadingSlash, resolveLocalePath } from 'vuepress/shared'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { RecoThemeData } from '../types/options.js'

// todo 增加对 detail 和 代码示例的展示
const svgMap = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg>',
  details: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l5 5l5-5"></path><path d="M7 13l5 5l5-5"></path></g></svg>'
}

const parseLocalTitle = (type, env, locales) => {
  let title
  const { filePathRelative } = env
  const relativePath = ensureLeadingSlash(filePathRelative ?? '')

  const localePath = resolveLocalePath(locales, relativePath)
  const localeData = locales[localePath] ?? {}

  if (localeData.defaultInfo) {
    title = localeData.defaultInfo
  } else {
    title = type.toUpperCase()
  }

  return title
}

const renderOptions = (locals) => (tokens, idx, options, env, self) => {
  const { type, info } = tokens[idx]
  const [customType, title] = info.trim().split(' ')
  if (/container\_\w+\_open/g.test(type)) {
    const localTitle = parseLocalTitle(customType, env, locals)
    return `<div class="custom-container ${customType}">${svgMap[customType] || ''}<p class="custom-container-title">${ title || localTitle }</p>`
  }

  if (/container\_\w+\_close/g.test(type)) {
    return '</div>'
  }

  return self.renderToken(tokens, idx, options)
}

const renderOptionsForDetails = (locals) => (tokens, idx, options, env, self) => {
  const { type, info } = tokens[idx]
  const [customType, title] = info.trim().split(' ')
  if (/container_details_open/g.test(type)) {
    const localTitle = parseLocalTitle(customType, env, locals)
    return `<details class="custom-container ${customType}"><summary class="custom-container-title">${ title || localTitle }</summary>`
  }

  if (/container_details_close/g.test(type)) {
    return '</details>'
  }

  return self.renderToken(tokens, idx, options)
}

const resolveOptionsForCodeGroup = () => {
  return {
    before: () => `<CodeGroup>\n`,
    after: () => '</CodeGroup>\n',
  }
}

const resolveOptionsForCodeGroupItem = () => {
  return {
    before: (info) => `<CodeGroupItem title="${info}">\n`,
    after: () => '</CodeGroupItem>\n',
  }
}

export const resolveContainerOptions = (type: string, themeData: RecoThemeData): ContainerPluginOptions => {
  const locales = Object.entries(themeData.locales || {}).reduce(
    (result, [key, value]) => {
      result[key] = {
        defaultInfo: value?.[type] ?? themeData[type],
      }
      return result
    },
    {},
  )

  let render = renderOptions(locales)

  if (type === 'details') {
    render = renderOptionsForDetails(locales)
    return { type, render }
  }

  if (type === 'code-group') {
    return { type, ...resolveOptionsForCodeGroup() }
  }

  if (type === 'code-group-item') {
    return { type, ...resolveOptionsForCodeGroupItem() }
  }

  return { type, render }
}
