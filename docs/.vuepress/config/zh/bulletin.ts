export const bulletin = {
  body: [
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
