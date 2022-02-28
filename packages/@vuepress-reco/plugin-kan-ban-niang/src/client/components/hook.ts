import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client';
export function useConfig() {
    const themeLocal = useThemeLocaleData();
    // console.log('======= themeLocal:', themeLocal.value.kanBanNiangConfig);
    const { clean, messages, theme, modelStyle, btnStyle, width, height, messageStyle } = themeLocal.value.kanBanNiangConfig || {};
    return {
      CLEAN: clean || false,
      THEME: theme || ['wanko', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'miku', 'z16'],
      MESSAGES: messages || {
        welcome: '',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '你知道我喜欢吃什么吗？痴痴地望着你。',
        info: '想知道关于我的更多信息吗？'
      },
      MESSAGE_STYLE: messageStyle || {
        right: '68px',
        bottom: '190px'
      },
      MODEL_STYLE: modelStyle || {
        right: '90px',
        bottom: '0px',
        opacity: '0.9'
      },
      BTN_STYLE: btnStyle || {
        right: '90px',
        bottom: '40px'
      },
      WIDTH: width || 150,
      HEIGHT: height || 220
    };
}
