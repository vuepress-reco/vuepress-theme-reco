// todo 增加对 detail 和 代码示例的展示
const svgMap = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg>',
  details: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l5 5l5-5"></path><path d="M7 13l5 5l5-5"></path></g></svg>'
}

const renderOptions = (tokens, idx) => {
  const { type, info } = tokens[idx]
  const [customType, title] = info.trim().split(' ')
  if (/container\_\w+\_open/g.test(type)) {
    return `<div class="custom-container ${customType}">${svgMap[customType] || ''}<p class="custom-container-title">${ title || customType.toUpperCase() }</p>`
  }

  if (/container\_\w+\_close/g.test(type)) {
    return '</div>'
  }
}

const renderOptionsForDetails = (tokens, idx) => {
  const { type, info } = tokens[idx]
  const [customType, title] = info.trim().split(' ')
  if (/container_details_open/g.test(type)) {
    return `<details class="custom-container ${customType}"><summary class="custom-container-title">${ title || customType.toUpperCase() }</summary>`
  }

  if (/container_details_close/g.test(type)) {
    return '</details>'
  }
}

export const resolveOptionsForCodeGroup = () => {
  return {
    before: () => `<CodeGroup>\n`,
    after: () => '</CodeGroup>\n',
  }
}

export const resolveOptionsForCodeGroupItem = () => {
  return {
    before: (info) => `<CodeGroupItem title="${info}">\n`,
    after: () => '</CodeGroupItem>\n',
  }
}

export const resolveContainerOptions = (type) => {
  let render = renderOptions

  if (type === 'details') {
    render = renderOptionsForDetails
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
