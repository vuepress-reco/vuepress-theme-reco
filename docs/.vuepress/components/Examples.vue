<template>
  <div class="examples__container">
    <div
      class="examples__item"
      v-for="(item, index) in examplesData"
      :key="index"
      :style="{ backgroundImage: `url(${item.thumbnail})`}"
    >
      <div
        class="examples__item__btn"
        :style="{ backgroundImage: `url(${item.avator})` }"
      >
        <span
          class="btn--go"
          @click="jumpLink(item.link)"
        >Go</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import examplesData from '../data/examples';

const jumpLink = (link?: string) => {
  if (link) {
    window.open(link, '_blank')
  }
}
</script>

<style scoped>
@import '@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css';

.examples__container {
  @apply flex flex-wrap;
  .examples__item {
    @apply relative w-72 h-40 my-4 border-block overflow-hidden bg-cover bg-center;
    @apply hover:border-0 hover:border-primary hover:shadow-2xl hover:shadow-reco-primary;
    &:nth-child(3n+2) {
      @apply mx-8;
    }
    &:hover {
      .examples__item__btn {
        @apply bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 shadow shadow-reco-primary;
        .btn--go {
          @apply block;
        }
      }
    }
    .examples__item__btn {
      @apply absolute right-4 bottom-4 w-10 h-10 overflow-hidden bg-cover bg-center;
      @apply transition-all duration-500 ease-in-out;
      border-radius: 50%;
      .btn--go {
        @apply hidden w-full h-full text-center leading-10 cursor-pointer font-bold bg-reco-primary text-reco-text-darkmode;
      }
    }
  }
}
</style>
