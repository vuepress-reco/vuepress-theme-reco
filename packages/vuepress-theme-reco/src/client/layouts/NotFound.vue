<template>
  <GenericContainer>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>{{ themeLocal.notFound || 'Oops! Page does not exist.' }}</p>
        <div class="xicon-container" @click="goHome">{{ themeLocal.backToHome || 'Back To Home' }}</div>
      </div>
      <img src="../assets/taken.svg" />
    </section>
  </GenericContainer>
</template>

<script lang="ts" setup>
import { useRouteLocale, useRouter } from 'vuepress/client';

import GenericContainer from '@components/GenericContainer/index.vue'

import { useThemeLocaleData } from '@composables/index.js';

const router = useRouter()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const goHome = () => {
  router.push(themeLocal.value.home || routeLocale.value)
}
</script>
