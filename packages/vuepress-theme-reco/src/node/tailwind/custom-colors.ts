// 品牌色
const brand = {
  DEFAULT: '#4954e6',
  light: '#616ae5',
}

// 背景色
const bg = {
  light: {
    DEFAULT: '#ffffff',
    light: '#f3f4f5',
    lighter: '#eeeeee',
  },
  dark: {
    DEFAULT: '#22272e',
    light: '#2b313a',
    lighter: '#262c34',
  },
  code: {
    DEFAULT: '#F9FAFB',
    dark: '#363b46',
  },
}

// 文本色
const text = {
  accent: brand.DEFAULT,
  quote: '#999999',
  light: {
    DEFAULT: '#2c3e50',
    light: '#3a5169',
    lighter: '#4e6e8e',
    lightest: '#6a8bad',
  },
  dark: {
    DEFAULT: '#adbac7',
    light: '#96a7b7',
    lighter: '#8b9eb0',
    lightest: '#8094a8',
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
