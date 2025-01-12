<template>
  <div
    v-if="tp >1"
    class="pagation-container"
  >
    <Xicons
      v-if="currentPage > 1"
      class="jump"
      :icon="IconChevronLeft"
      :iconSize="16"
      unselectable="on"
      key="left"
      @click="goPrev"
    />

    <span
      v-if="showStartFakePageNum"
      class="jump"
      key="page-one"
      @click="jumpPage(1)"
    >1</span>

    <span
      class="ellipsis"
      v-if="showStartFakePageNum && indexes[0] > 2"
      key="ellipsis-front"
    >...</span>

    <span
      class="jump"
      v-for="num in indexes"
      :key="`page-${num}`"
      :class="{active:currentPage == num}"
      @click="jumpPage(num)"
    >{{num}}</span>

    <span
      class="ellipsis"
      key="ellipsis-back"
      v-if="showLastFakePageNum && (tp - (indexes.at(-1) as number) > 1)"
    >...</span>

    <span
      v-if="showLastFakePageNum"
      class="jump"
      key="page-lastest"
      @click="jumpPage(tp)"
    >{{tp}}</span>

    <Xicons
      v-if="currentPage < tp"
      class="jump"
      key="right"
      :icon="IconChevronRight"
      :iconSize="16"
      @click="goNext"
    />

    <span
      class="jumpinput"
      key="input">
      <input type="text" v-model="targetPage">
    </span>

    <span
      class="jump go"
      key="go"
      @click="jumpPage(targetPage)"
    >Go</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@components/icons/index.js'

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
  return Math.ceil(props.total / props.pageSize)
})


const showStartFakePageNum = computed(() => {
  return efont.value && !indexes.value.includes(1)
})

const showLastFakePageNum = computed(() => {
  return efont.value && !indexes.value.includes(tp.value)
})

const efont = computed(() => {
  return tp.value > 7
})

const indexes = computed(() => {
  const ar : number[] = []
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
  if(p>tp.value){
    emits('change',tp.value)
  }else if(p<=0){
    emits('change',1)
  }else{
    emits('change',p)
  }
  targetPage.value =  null
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
