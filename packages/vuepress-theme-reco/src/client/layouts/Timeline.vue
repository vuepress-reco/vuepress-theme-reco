<template>
  <Common class="timeline-wrapper">
    <ul class="timeline-content">
      <li
        v-for="(item, index) in timelineData"
        :key="index"
      >
        <h2 class="year">{{item.year}}</h2>
        <ul class="year-wrapper">
          <li v-for="(subItem, subIndex) in item.data" :key="subIndex" class="item">
            <span class="date">{{subItem.date}}</span>

            <RouterLink class="title" :to="subItem.path">{{ subItem.title }}</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </Common>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Common from '../components/Common/index.vue'


import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import { formatISODate } from '../utils/other'

const { posts } = usePageData()

const dataMap: {
  [key: string]: Array<any>
} = {}

posts.forEach(post => {
  if (!post.frontmatter.date) return

  let connector = post.frontmatter.date.includes('/') ? '/' : '-'

  const [year, mounth, day] = formatISODate(post.frontmatter.date).split(' ')[0].split(connector) || []

  if (!year || !mounth || !day) return

  if (!dataMap[year]) {
    dataMap[year] = [{
      ...post,
      date: `${mounth}${connector}${day}`
    }]

    return
  }

  dataMap[year].push({
    ...post,
    date: `${mounth}-${day}`
  })
});

interface TimelineData {
  year: string,
  data: any
}

const timelineData: Array<TimelineData> = Object.keys(dataMap).reduce(
  (all: Array<TimelineData>, next: string) => {
    all.push({
      year: next,
      data: dataMap[next]
    })

    return all
  },
  []
)
</script>
