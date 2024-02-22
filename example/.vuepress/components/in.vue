<template>
  <div style="width: 100px">vue preview {{ a }} {{ b }}</div>
</template>

<script setup>
import { ref } from 'vue'

const b = ref(2)
import { a } from "./index.js";
</script>
