<template>
  <div v-if="visible" class="bulletin-wrapper" :style="{ width: bulletin?.value?.width || '300px' }">
    <div class="bulletin-title">
      <Xicons
        icon="Bulb"
        icon-size="28"
        icon-color="#fff"
        :text="bulletin?.value?.title || '公告'"
        text-color="#fff"
        text-size="16"
      />
      <!-- <span>公告</span> -->
      <i class="btn-close" @click="closeBulletinPopover">
        <svg t="1573745677073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="22" height="22"><path d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0" p-id="4449"></path></svg>
      </i>
    </div>
    <div class="bulletin-content" v-html="bodyNodes"></div>
    <hr>
    <div class="bulletin-footer" v-html="footerNodes"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue-demi'
import { useVisible, useHandleNodes } from './hook'

const { visible, closeBulletinPopover } = useVisible()
const { bodyNodes } = useHandleNodes()
</script>
