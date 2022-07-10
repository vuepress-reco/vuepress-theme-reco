<template>
  <Common>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="icon-container" @click="goHome">Go Home</div>
      </div>
      <img src="../assets/taken.svg" />
    </section>
  </Common>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Common from '../components/Common/index.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

