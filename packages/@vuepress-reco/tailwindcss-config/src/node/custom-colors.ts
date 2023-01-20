// 品牌色
const primary = '#4954e6'

// 背景色
const bg = {
  lightmode: {
    DEFAULT: '#ffffff',
    lighter: '#f3f4f5',
    lightest: '#eeeeee',
    code: '#F9FAFB',
  },
  darkmode: {
    DEFAULT: '#22272e',
    lighter: '#2b313a',
    lightest: '#262c34',
    code: '#363b46',
  },
}

// 文本色
const text = {
  lightmode: {
    DEFAULT: '#2c3e50',
    lighter: '#3a5169',
    lightesr: '#4e6e8e',
  },
  darkmode: {
    DEFAULT: '#adbac7',
    lighter: '#96a7b7',
    lightest: '#8b9eb0',
  },
}

// 边框
const border = {
  lightmode: {
    DEFAULT: '#eaecef',
    darker: '#dfe2e5',
  },
  darkmode: {
    DEFAULT: '#3e4c5a',
    darker: '#34404c',
  },
}

// 自定义容器
const container = {
  warning: 'rgb(251, 155, 95)',
  danger: 'rgb(242, 109, 109)',
}

const colors = {
  reco: {
    primary,
    bg,
    text,
    border,
    container,
  },
}

export { colors }
