// todo 增加对 detail 和 代码示例的展示
const svgMap = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3z" fill="currentColor"></path><path d="M16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z" fill="currentColor"></path><path d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4z" fill="currentColor"></path></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3z" fill="currentColor"></path><path d="M16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z" fill="currentColor"></path><path d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4z" fill="currentColor"></path></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z" fill="currentColor"></path><path d="M15 8h2v11h-2z" fill="currentColor"></path><path d="M16 22a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22z" fill="currentColor"></path></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21.41 23L16 17.591L10.59 23L9 21.41L14.409 16L9 10.591L10.591 9L16 14.409L21.409 9L23 10.591L17.591 16L23 21.41L21.41 23z" fill="currentColor"></path><path d="M16 4A12 12 0 1 1 4 16A12.014 12.014 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2z" fill="currentColor"></path></svg>'
}

export const resolveContainer = (tokens, idx) => {
  const { type, info } = tokens[idx]
  const [customType, title] = info.trim().split(' ')
  if (/container\_\w+\_open/g.test(type)) {
    return `<div class="custom-container ${customType}">${svgMap[customType] || ''}<p class="custom-container-title">${ title || customType.toUpperCase() }</p>`
  }

  if (/container\_\w+\_close/g.test(type)) {
    return '</div>'
  }
}
