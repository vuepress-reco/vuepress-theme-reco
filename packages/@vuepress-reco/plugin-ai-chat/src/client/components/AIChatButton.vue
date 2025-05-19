<template>
  <div class="ai-chat-button-container">
    <!-- 悬浮按钮 -->
    <div
      class="ai-chat-floating-button"
      @click="toggleChatWindow"
    >
    🤖
    </div>

    <!-- 聊天窗口 -->
    <div v-if="isOpen" class="ai-chat-window">
      <div class="ai-chat-window-header">
        <Xicons
          icon="VolumeUp"
          icon-size="20"
          :text="`🤖 ${bulletin?.title || 'AI Assistant'}`"
          color="#fff"
          text-size="16"
        />
        <div class="header-buttons">
          <svg class="btn-new-chat" @click="createNewChat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
          <svg class="btn-close icon" @click="toggleChatWindow" t="1573745677073" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="22" height="22"><path d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0" p-id="4449"></path></svg>
        </div>
      </div>
      <div class="ai-chat-window-body">
        <AIChat ref="chatInstance" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import AIChat from './AIChat.vue'

// 控制聊天窗口的显示状态
const isOpen = ref(false)

// 引用子组件AIChat的实例
const chatInstance = ref(null)

// 切换聊天窗口的显示状态
const toggleChatWindow = () => {
  isOpen.value = !isOpen.value
}

// 创建新的聊天（清除历史）
const createNewChat = () => {
  // 调用AIChat组件的clearChatHistory方法
  if (chatInstance.value && chatInstance.value.clearChatHistory) {
    chatInstance.value.clearChatHistory()
  }
}

// 点击外部关闭聊天窗口
const handleClickOutside = (event: MouseEvent) => {
  const el = event.target as HTMLElement
  const container = document.querySelector('.ai-chat-button-container')

  if (isOpen.value && container && !container.contains(el)) {
    isOpen.value = false
  }
}

// 监听窗口大小变化，在小屏幕上自动关闭
const handleResize = () => {
  if (window.innerWidth < 768 && isOpen.value) {
    isOpen.value = false
  }
}

// 监听点击事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

// 清理事件监听
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})

// 监听聊天窗口的显示状态变化，当打开时添加样式防止页面滚动
watch(isOpen, (val) => {
  if (val) {
    document.body.classList.add('ai-chat-open')
  } else {
    document.body.classList.remove('ai-chat-open')
  }
})
</script>

<style>
/* 容器样式 */
.ai-chat-button-container {
  position: fixed;
  bottom: 140px;
  right: 15px;
  z-index: 100;
}

/* 悬浮按钮样式 */
.ai-chat-floating-button {
  @apply bg-reco-primary;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.ai-chat-floating-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* 聊天图标 */
.ai-chat-icon {
  fill: white;
  width: 30px;
  height: 30px;
}

/* 关闭图标 */
.close-icon {
  font-size: 30px;
  line-height: 1;
}

/* 聊天窗口样式 */
.ai-chat-window {
  @apply fixed flex-col  top-20 right-4 z-30 flex box-border rounded-lg bg-basic border-primary;
  position: fixed;
  width: 380px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

/* 聊天窗口头部 */
.ai-chat-window-header {
  @apply flex items-center justify-between box-border m-0 p-1.5 bg-reco-primary text-white;
}

.ai-chat-window-header h3 {
  margin: 0;
  font-size: 18px;
}

/* 头部按钮容器 */
.header-buttons {
  display: flex;
  align-items: center;
}

/* 新建对话按钮 */
.btn-new-chat {
  @apply inline-block w-8 h-8 cursor-pointer text-white;
  @apply fill-current;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-right: 10px;
}

/* 关闭按钮 */
.btn-close {
  @apply inline-block w-6 h-6 cursor-pointer text-white;
  @apply fill-current;
}

/* 聊天窗口主体 */
.ai-chat-window-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式样式 */
@media (max-width: 767px) {
  .ai-chat-window {
    width: calc(100% - 40px);
    height: calc(100vh - 140px);
    bottom: 80px;
    right: 20px;
    left: 20px;
  }
}

/* 防止页面滚动 */
body.ai-chat-open {
  overflow: hidden;
}
</style>
