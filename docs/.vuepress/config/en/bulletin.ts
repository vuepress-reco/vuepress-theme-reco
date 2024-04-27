export const bulletin = {
  title: 'Bulletin',
  body: [
    {
      type: 'title',
      content: 'QQ Channel：3u8x6485s0',
    },
    {
      type: 'image',
      src: '/qq_channel.png',
    },
    {
      type: 'text',
      // content: `
      // <ul>
      //   <li>QQ Group 1：1037296104</li>
      //   <li>QQ Group 2：1061561395</li>
      //   <li>QQ Group 3：962687802</li>
      // </ul>`,
      content: `<br /><div><b>Tip: </b>The original three QQ group members are quite different and scattered, so new people are stopped to join the group now. In order to facilitate your communication, please move to the QQ channel.</div>`,
      style: 'font-size: 12px; color: red;'
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
