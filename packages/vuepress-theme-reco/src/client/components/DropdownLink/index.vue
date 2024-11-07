<template>
  <div class="dropdown-link" :class="{ open }">
    <button
      class="dropdown-link__title"
      :class="isChildActive ? 'dropdown-link__title--active' : ''"
      type="button"
      :aria-label="dropdownAriaLabel"
      @mouseenter="handleButtonMouseEnter"
      @mouseleave="handleButtonMouseLeave"
    >
      <Xicons class="title" :icon="item.icon" :text="item.text" />
      <span v-if="item.text || item.icon" class="arrow down" />
    </button>

    <button
      class="dropdown-link--mobile__title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleMobileButtonClick"
    >
      <span class="title">
        <Xicons :icon="item.icon" :text="item.text" />
      </span>
      <span v-if="item.text" class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul
        v-show="open"
        class="dropdown-link__container"
        @mouseenter="handleDropdownMouseEnter"
        @mouseleave="handleDropdownMouseLeave"
      >
        <li
          v-for="(child, index) in item.children"
          :key="child.link || index"
          class="dropdown-link__item"
        >
          <template v-if="child.children">
            <h5 class="dropdown-link__subtitle">
              <Xicons :icon="child.icon" :text="child.text" />
            </h5>

            <ul class="dropdown-link__subcontainer">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="dropdown-link__subitem"
              >
                <Link
                  :item="grandchild"
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <Link
              :item="child"
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vuepress/client'
import { computed, ref, toRefs, watch } from 'vue'

import Link from '@components/Link.vue'
import DropdownTransition from './DropdownTransition.vue'

import type { PropType } from 'vue'
import type { MenuGroup, MenuLink, MenuLinkGroup } from '../../../types'

const props = defineProps({
  item: {
    type: Object as PropType<MenuGroup<MenuLinkGroup>>,
    required: true,
  },
})
const { item } = toRefs(props)
const dropdownAriaLabel = computed(
  () => item.value.ariaLabel || item.value.text
)

const open = ref(false)
const route = useRoute()
watch(
  () => route.path,
  () => {
    open.value = false
  }
)

const inButton = ref(false)
const handleButtonMouseEnter = () => {
  if (isMobile.value) isMobile.value = false

  open.value = true
  inButton.value = true
}
const handleButtonMouseLeave = () => {
  inButton.value = false

  setTimeout(() => {
    if (inButton.value || inDropdown.value) {
      open.value = true
    } else {
      open.value = false
    }
  }, 200)
}

const inDropdown = ref(false)
const handleDropdownMouseEnter = () => {
  if (isMobile.value) return

  inDropdown.value = true
}
const handleDropdownMouseLeave = () => {
  if (isMobile.value) return

  inDropdown.value = false

  setTimeout(() => {
    if (inButton.value || inDropdown.value) {
      open.value = true
    } else {
      open.value = false
    }
  }, 200)
}

const isMobile = ref(true)
const handleMobileButtonClick = () => {
  open.value = !open.value
  if (!isMobile.value) isMobile.value = true
}


const isChildActive = computed(() => {
  function traverse(node) {
    if (node.children) {
      return node.children.some(child => traverse(child));
    }

    if (node.link && !node.language) {
      return route?.path?.indexOf(node.link) > -1
    }
  }

  return traverse(item.value)
})

</script>
