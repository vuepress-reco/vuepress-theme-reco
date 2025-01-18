export const bulletin = {
  body: [
    {
      type: 'title',
      content: '最新版本',
    },
    {
      type: 'text',
      content: `
      <ul>
        <li>vuepress：2.0.0-rc.19</li>
        <li>reco 主题：2.0.0-rc.26</li>
      </ul>`,
      style: 'font-size: 12px; color: #5D67E8;'
    },
    {
      type: 'title',
      content: 'QQ 频道：3u8x6485s0',
    },
    {
      type: 'image',
      src: '/qq_channel.png',
    },
    {
      type: 'text',
      // content: `
      // <ul>
      //   <li>QQ群1：1037296104</li>
      //   <li>QQ群2：1061561395</li>
      //   <li>QQ群3：962687802</li>
      // </ul>`,
      content: `<br /><div><b>周知：</b>原 3 个 QQ 群成员活跃状态差异较大，且分布较分散，现停止新人加群，为了方便大家的交流，请移步 QQ 频道。</div>`,
      style: 'font-size: 12px; color: #5D67E8;'
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
