<template>
  <Common>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container" @click="goHome">Go Home</div>
      </div>
      <img src="../assets/taken.svg" />
    </section>
  </Common>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRouteLocale, withBase } from '@vuepress/client';
import Common from '../components/Common/index.vue'
import { useThemeLocaleData } from '../composables';

const router = useRouter()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const goHome = () => {
  router.push(withBase(themeLocal.value.home || routeLocale.value))
}
</script>

