<template>
  <Transition
    name="bounce"
    mode="out-in"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
const setHeight = (items): void => {
  items.style.height = items.scrollHeight + 'px'
}

const unsetHeight = (items): void => {
  items.style.height = ''
}
</script>



<style>
.bounce-enter-active {
  animation: bounce-in 0.1s;
}
.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
