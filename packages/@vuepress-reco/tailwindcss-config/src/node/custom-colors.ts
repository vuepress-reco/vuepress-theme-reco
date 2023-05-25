// 品牌色
const primary = '#5D67E8'

// 背景色
const bg = {
  lightmode: {
    DEFAULT: '#ffffff',
    code: '#F9FAFB',
    active: '#F4F5F5',
  },
  darkmode: {
    DEFAULT: '#161617',
    code: '#202022',
    active: '#27272a',
  },
}

// 文本色
const text = {
  lightmode: {
    DEFAULT: 'rgba(60, 60, 67)',
    lighter: 'rgba(60, 60, 67, .75)',
  },
  darkmode: {
    DEFAULT: 'rgba(255, 255, 245, .86)',
    lighter: 'rgba(235, 235, 245, .6)',
  },
}

// 边框
const border = {
  lightmode: 'rgba(200, 200, 200, .32)',
  darkmode: 'rgba(82, 82, 89, .32)',
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
