<template>
  <div class="password-wrapper">
    <input
      maxlength="6"
      type="password"
      ref="passwordRef"
      v-model="password"
    />

    <div class="site-info">
      <img
        v-if="siteBrandLogo"
        class="logo"
        :src="withBase(siteBrandLogo)"
        :alt="siteBrandTitle"
      />

      <h1
        v-if="siteBrandTitle"
        class="site-name"
      >
        {{ siteBrandTitle }}
      </h1>
    </div>

    <div>
      <Xicons
        :icon="lockIcon"
        :text="lockText"
      />
    </div>

    <ul class="password-show" @click="focus">
      <li><i v-if="password.length > 0"></i></li>
      <li><i v-if="password.length > 1"></i></li>
      <li><i v-if="password.length > 2"></i></li>
      <li><i v-if="password.length > 3"></i></li>
      <li><i v-if="password.length > 4"></i></li>
      <li><i v-if="password.length > 5"></i></li>
    </ul>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vuepress/client'

import { useSiteInfo, useHandlePassword } from './hook.js'
import Footer from '../Home/Footer.vue'


const emit = defineEmits(['pass'])

const { siteBrandLogo, siteBrandTitle, sitePassword } = useSiteInfo()
const { password, passwordRef, lockIcon, lockText, focus } = useHandlePassword(
  sitePassword, emit
)
</script>
