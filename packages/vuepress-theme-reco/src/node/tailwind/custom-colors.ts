// 品牌色
const brand = {
  DEFAULT: '#4954e6',
  lighter: '#616ae5',
}

// 背景色
const bg = {
  lightmode: {
    DEFAULT: '#ffffff',
    lighter: '#f3f4f5',
    lightest: '#eeeeee',
    code: '#F9FAFB'
  },
  darkmode: {
    DEFAULT: '#22272e',
    lighter: '#2b313a',
    lightest: '#262c34',
    code: '#363b46'
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
  light: {
    DEFAULT: '#eaecef',
    darker: '#dfe2e5',
  },
  dark: {
    DEFAULT: '#3e4c5a',
    darker: '#34404c',
  },
}

// 自定义容器
const container = {
  info: {
    border: 'rgb(97, 106, 229)',
    bg: 'rgba(97, 106, 229, 0.1)'
  },
  warning: {
    border: 'rgb(251, 155, 95)',
    bg: 'rgba(251, 155, 95, 0.1)'
  },
  danger: {
    border: 'rgb(242, 109, 109)',
    bg: 'rgba(242, 109, 109, 0.1)'
  }
}

const colors = {
  reco: {
    brand,
    bg,
    text,
    border,
    container
  },
}

export { colors }
