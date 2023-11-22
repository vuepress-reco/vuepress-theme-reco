export const bulletin = {
  body: [
    {
      type: 'title',
      content: '最新版本',
    },
    {
      type: 'text',
      content: `
      <div>
        <div>vuepress@2.0.0-rc.0</div>
        <div>vuepress-theme-reco@2.0.0-rc.1</div>
      </div>`,
      style: 'font-size: 12px;'
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
