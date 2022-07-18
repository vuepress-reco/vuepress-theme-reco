export const bulletin = {
  width: '480px',
  body: [
    {
      type: 'text',
      content: `
        <h7>强烈建议大家更新至 2.0.0-beta.16，更新内容如下：</h7>
        <ul>
          <li>适配 vuepress BREAKING CHANGES：vuepress 在 2.0.0-beta.39 版本之后，做了大量的 API 调整，针对用户侧，主题和插件由原来的声明式改为函数式；针对开发者侧，对 Enhance 和 Setup 做了调整。</li>
          <li>将默认 Bundler 改为 vite。</li>
          <li>升级 Valine 升级至 1.4.18，修复 cdn 加载失败问题。</li>
        </ul>`,
      style: 'font-size: 12px;'
    },
    {
      type: 'hr',
    },
    {
      type: 'title',
      content: 'QQ 群',
    },
    {
      type: 'text',
      content: `
      <ul>
        <li>QQ群1：1037296104</li>
        <li>QQ群2：1061561395</li>
        <li>QQ群3：962687802</li>
      </ul>`,
      style: 'font-size: 12px;'
    },
    {
      type: 'hr',
    },
    {
      type: 'title',
      content: 'GitHub',
    },
    {
      type: 'text',
      content: `
      <ul>
        <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco/issues">Issues<a/></li>
        <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco/discussions/1">Discussions<a/></li>
      </ul>`,
      style: 'font-size: 12px;'
    },
    {
      type: 'hr',
    },
    {
      type: 'buttongroup',
      children: [
        {
          text: '打赏',
          link: '/docs/others/donate.html'
        }
      ]
    }
  ],
}
