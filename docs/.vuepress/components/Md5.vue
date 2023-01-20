<template>
  <div class="md5-wrapper">
    <input type="text" v-model="password" placeholder="请输入你的密码">
    <p><span v-show="md5Str !== ''">md5 密文：{{ md5Str }}</span></p>
  </div>
</template>

<script>
import { md5 } from '@vuepress-reco/shared'
export default {
  data () {
    return {
      password: ''
    }
  },
  computed: {
    md5Str () {
      const pw = this.password
      return pw === '' ? '' : md5(this.password)
    }
  }
}
</script>

<style scoped>
.md5-wrapper {
  @apply mt-4;
  input {
    @apply outline-none box-border p-2 text-reco-primary border-reco-primary border-2 border-solid rounded-lg;
  }
}
</style>

