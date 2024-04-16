export const bulletin = {
  title: 'Bulletin',
  body: [
    {
      type: 'title',
      content: 'Latest',
    },
    {
      type: 'text',
      content: `
      <div>
        <div>vuepress@2.0.0-rc.9</div>
        <div>vuepress-theme-reco@2.0.0-rc.8</div>
      </div>`,
      style: 'font-size: 12px;'
    },
    {
      type: 'title',
      content: 'QQ Group',
    },
    {
      type: 'text',
      content: `
      <ul>
        <li>QQ Group 1：1037296104</li>
        <li>QQ Group 2：1061561395</li>
        <li>QQ Group 3：962687802</li>
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
