<template>
  <GenericContainer>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container">Go Home</div>
      </div>
    </section>
  </GenericContainer>
</template>

<script lang="ts" setup>
import { useRouteLocale } from 'vuepress/client';
import GenericContainer from '@components/GenericContainer/index.vue'
import { useThemeLocaleData } from '@composables/index.js';

const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()
</script>

