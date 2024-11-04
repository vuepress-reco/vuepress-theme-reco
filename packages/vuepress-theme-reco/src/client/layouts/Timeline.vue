<template>
  <GenericContainer class="timeline-wrapper">
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
  </GenericContainer>
</template>

<script setup lang="ts">
import GenericContainer from '@components/GenericContainer/index.vue'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import { formatISODate } from '@utils/other.js'

const { posts } = useExtendPageData()

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

const timelineData: Array<TimelineData> = Object.keys(dataMap).sort((a, b) => Number(b) - Number(a)).reduce(
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

