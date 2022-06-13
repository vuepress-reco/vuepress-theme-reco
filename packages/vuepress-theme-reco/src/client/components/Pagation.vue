<template>
  <div class="pagation-container">
    <span
      class="jump"
      v-show="currentPage > 1"
      @click="goPrev"
      unselectable="on"
    >
      <Xicons icon="ChevronsLeft" :iconSize="16" />
    </span>
    <span
      v-show="efont"
      class="jump"
      @click="jumpPage(1)"
    >1</span>
    <span
      class="ellipsis"
      v-show="efont"
    >...</span>
    <span
      class="jump"
      v-for="num in indexs"
      :key="num"
      :class="{active:currentPage == num}"
      @click="jumpPage(num)"
    >{{num}}</span>
    <span
      class="ellipsis"
      v-show="efont && currentPage < tp - 4"
    >...</span>
    <span
      v-show="efont && currentPage < tp - 4"
      class="jump"
      @click="jumpPage(tp)"
    >{{tp}}</span>
    <span
      class="jump"
      v-show="currentPage < tp"
      @click="goNext"
    >
      <Xicons icon="ChevronsRight" :iconSize="16" />
    </span>
    <span class="jumpinput">
      <input type="text" v-model="targetPage">
    </span>
    <span
      class="jump gobtn"
      @click="jumpPage(targetPage)"
    >Go</span>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  totalPage: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['change'])

const targetPage = ref(null)

const tp = computed(() => {
  if (props.totalPage !== 0) return props.totalPage
  return Math.ceil(props.total / props.pageSize)
})

const show = computed(() => {
  return props.tp && props.tp != 1
})

const efont =computed(() => {
  if (tp.value <= 7) return false
  return props.currentPage > 5
})

const indexs = computed(() => {
  const ar = []
  let left = 1
  let right = tp.value
  if (tp.value >= 7) {
    if (props.currentPage > 5 && props.currentPage < tp.value - 4) {
      left = Number(props.currentPage) - 3
      right = Number(props.currentPage) + 3
    } else {
      if (props.currentPage <= 5) {
        left = 1
        right = 7
      } else {
        right = tp.value

        left = tp.value - 6
      }
    }
  }
  while (left <= right) {
    ar.push(left)
    left++
  }
  return ar
})

const jumpPage = (page) => {
  const p = parseInt(page)

  if (p <= tp.value && p > 0) {
    emits('change', page)
    return
  }

  alert(`请输入大于0，并且小于${tp.value}的页码！`)
}

const goPrev = () => {
  let currentPage = props.currentPage
  if (currentPage > 1) {
    emits('change', --currentPage)
  }
}

const goNext = () => {
  let currentPage = props.currentPage
  if (currentPage < tp.value) {
    emits('change', ++currentPage)
  }
}
</script>
