export const bulletin = {
  title: 'Bulletin',
  body: [
    {
      type: 'title',
      content: 'QQ Group',
    },
    {
      type: 'text',
      content: `
      <ul>
        <li>Group 1：1037296104</li>
        <li>Group 2：1061561395</li>
        <li>Group 3：962687802</li>
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
          text: 'Donate',
          link: '/docs/others/donate.html'
        }
      ]
    }
  ],
}
