<template>
  <div class="kanbanniang">

    <!-- 展开状态 -->
    <div class="banniang-container" v-show="isLoaded">
      <div class="messageBox" :style="messageStyle" v-show="isShowMessageBox">
        {{ messages.message || '欢迎来到 ' + $site.title }}
      </div>
      <div
        v-show="!isShowBtns"
        :style="btnStyle"
        class="operation"
        @mouseenter="isShowMessageBox = true"
        @mouseleave="isShowMessageBox = false"
      >
          <!-- Home -->
          <i
            class="kbnfont kbn-ban-home ban-home"
            @click="goHome"
            @mouseenter="hoverGoHome"
            @mouseleave="resetMessage"
            title="Go To Home"
          ></i>
          <!-- Msg -->
          <i
            class="kbnfont kbn-ban-message message"
            title="Show Message"
          ></i>
          <!-- Close -->
          <i
            class="kbnfont kbn-ban-close close"
            @click="closeBanNiang"
            @mouseenter="hoverCloseBanNiang"
            @mouseleave="resetMessage"
            title="Close the Cartoon"
          ></i>
          <!-- Link -->
          <a target="_blank" href="https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html">
            <i
              class="kbnfont kbn-ban-info info"
              @mouseenter="hoverMoreInfo"
              @mouseleave="resetMessage"
              title="Go To Github"
            ></i>
          </a>
          <!-- Theme -->
          <i
            v-show="myTheme.length > 1"
            class="kbnfont kbn-ban-theme skin"
            @click="changeTheme"
            @mouseenter="hoverChangeTheme"
            @mouseleave="resetMessage"
            title="Change Theme"
          ></i>
      </div>

      <canvas
        id="banniang"
        :style="modelStyle"
        :width="style.width"
        :height="style.height"
        class="live2d"
      ></canvas>

    </div>

    <!-- 收起状态 -->
    <div class="showBanNiang" v-show="displayBanNiang" @click="showBanNiang">
      看板娘
    </div>
  </div>
</template>

<script>
import live2dJSString from './assets/js/live2d'
import { useConfig } from './hook'
export default {
  name: 'KanBanNiang',
  data () {
    const { CLEAN, THEME, MESSAGES, MESSAGE_STYLE, MODEL_STYLE, BTN_STYLE, WIDTH, HEIGHT } = useConfig()
    return {
      isLoaded: true,
      displayBanNiang: false,
      isShowMessageBox: false,
      isShowBtns: CLEAN,
      messages: MESSAGES,
      currentTheme: THEME[0],
      myTheme: THEME,
      themeName: ['wanko', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'miku', 'z16'],
      // 模型地址
      model: {
        wanko:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-wanko/assets/wanko.model.json',
        blackCat:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json',
        whiteCat:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json',
        haru1:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haru/01/assets/haru01.model.json',
        haru2:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haru/02/assets/haru02.model.json',
        haruto:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haruto/assets/haruto.model.json',
        koharu:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-koharu/assets/koharu.model.json',
        izumi:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-izumi/assets/izumi.model.json',
        shizuku:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-shizuku/assets/shizuku.model.json',
        miku:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-miku/assets/miku.model.json',
        z16:
          'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-z16/assets/z16.model.json'
      },
      // model的高宽
      style: {
        width: WIDTH,
        height: HEIGHT
      },
      // model的样式
      modelStyle: MODEL_STYLE,
      // messageBox的样式
      messageStyle: MESSAGE_STYLE,
      // 按钮的样式
      btnStyle: BTN_STYLE
    }
  },
  mounted () {
    this.btnStyle = {
      ...this.btnStyle,
      height: this.myTheme.length > 1 ? '120px' : '100px'
    }
    // 初始化live2d模型
    this.initBanNiang()
  },
  methods: {
    hoverGoHome () {
      this.messages.message = this.messages.home
    },
    hoverChangeTheme () {
      this.messages.message = this.messages.theme
    },
    hoverMoreInfo () {
      this.messages.message = this.messages.info
    },
    hoverCloseBanNiang () {
      this.messages.message = this.messages.close
    },
    resetMessage () {
      this.messages.message = this.messages.welcome
    },
    goHome () {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    changeTheme () {
      const themes = []
      for (var i = 0; i < this.myTheme.length; i++) {
        if (this.myTheme[i] != this.currentTheme) {
          themes.push(this.myTheme[i])
        }
      }
      const randomNum = Math.floor(Math.random() * (this.myTheme.length - 1))
      this.currentTheme = themes[randomNum]
      this.initBanNiang()
    },
    closeBanNiang () {
      this.isLoaded = false
      this.displayBanNiang = true
    },
    showBanNiang () {
      this.isLoaded = true
      this.displayBanNiang = false
      this.initBanNiang()
    },
    initBanNiang () {
      if (this.themeName.indexOf(this.currentTheme) === -1) {
        console.log('@vuepress-reco/vuepress-plugin-kan-ban-niang不支持主题' + this.currentTheme + ', 请检查主题名, 或前往https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html 查看支持的主题')
        document.querySelector('.kanbanniang').style.display = 'none'
        return
      }
      const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      if (isMobile) {
        this.isLoaded = false
        return console.log('mobile do not load model')
      }
      if (!window.loadlive2d) {
        const script = document.createElement('script')
        script.innerHTML = live2dJSString
        document.body.appendChild(script)
      }
      var ajax = new XMLHttpRequest()
      ajax.open('get', this.model[this.currentTheme])
      ajax.send()
      ajax.onreadystatechange = function () {
        if (ajax.status !== 200) {
          console.log('看板娘的CDN资源加载失败了，请稍后刷新页面重试！')
          document.querySelector('.kanbanniang').style.display = 'none'
        }
      }
      window.loadlive2d(
        'banniang',
        this.model[this.currentTheme]
      )
    }
  }
}
</script>

<style scoped>

/* 引入字体文件 */
@import './assets/iconfont/iconfont.css';

.kanbanniang {
  /* 不加层级，可能被别的页面挡住 */
  position: fixed;
  z-index: 999999;
}

.showBanNiang {
  position: fixed;
  right: 70px;
  bottom: 6rem;
  color: #3eaf7c;
  width: 68px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
	/* 其他主题识别不到变量时使用 */
  background-color: rgba(231,234,241,0.5);
	/* reco主题 */
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.banniang-container {
  position: fixed;
  right: 50px;
  bottom: 100px;
  color: #00adb5;
}
.messageBox {
  position: fixed;
  padding: 10px;
  height: 60px;
  width: 160px;
  border-radius: 8px;
  background-color: #9adbbe;
  color: #242424;
  opacity: 0.8;
}
.operation {
  width: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.operation i {
  font-size: 20px;
  cursor: pointer;
  color: #929292;
}
.operation i:hover {
  color: #00adb5;
}
#banniang {
  z-index: 99999;
  pointer-events: none;
  position: fixed;
}
</style>
