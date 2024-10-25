<template>
  <div v-if="visible" class="bulletin-wrapper" :style="{ width: bulletin?.width || '300px' }">
    <div class="bulletin-title">
      <Xicons
        icon="VolumeUp"
        icon-size="20"
        :text="bulletin?.title || '公告'"
        color="#fff"
        text-size="16"
      />

        <svg class="btn-close icon" @click="closeBulletinPopover" t="1573745677073" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="22" height="22"><path d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0" p-id="4449"></path></svg>
    </div>
    <div class="bulletin-content" v-html="bodyNodes"></div>
  </div>
</template>

<script setup lang="ts">
import { useVisible, useHandleNodes } from './hook.js'

const { visible, bulletin, closeBulletinPopover } = useVisible()
const { bodyNodes } = useHandleNodes()
</script>

<style>
@import '@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css';

.bulletin-wrapper {
  @apply fixed flex-col  top-20 right-4 z-30 flex box-border rounded-lg bg-basic border-primary;
  min-height: 200px;
  max-height: 660px;
  overflow-y: auto;
  .bulletin-title {
    @apply flex items-center justify-between box-border m-0 p-1.5 bg-reco-primary text-white;
    .btn-close {
      @apply inline-block w-4 h-4 right-2 cursor-pointer text-white;
      width: 22px;
      height: 22px;
      @apply fill-current;
    }
  }
  .bulletin-content {
    @apply flex-1 overflow-y-scroll box-border py-6 px-8;
    .btn-group {
      @apply text-center;
    }
    .btn {
      @apply inline-block w-14 h-14 text-center rounded-1/2 text-white cursor-pointer bg-reco-primary;
      line-height: 3.5rem;
      &:not(:first-child) {
        @apply ml-2;
      }
    }
    h5 {
      @apply my-4 pt-0;
    }
    img {
      @apply w-full;
    }
    hr {
      @apply my-8 border-t border-solid border-reco-primary;
    }
  }
}
</style>
