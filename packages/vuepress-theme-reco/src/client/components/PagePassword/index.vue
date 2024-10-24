<template>
  <div class="page-password-wrapper">
    <input
      maxlength="6"
      type="password"
      ref="passwordRef"
      v-model="password"
    />

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
  </div>
</template>

<script setup lang="ts">
import { usePageInfo, useHandlePassword } from './hook.js'

const emit = defineEmits(['pass'])

const { pagePassword } = usePageInfo()
const { password, passwordRef, lockIcon, lockText, focus } = useHandlePassword(
  pagePassword, emit
)
</script>
