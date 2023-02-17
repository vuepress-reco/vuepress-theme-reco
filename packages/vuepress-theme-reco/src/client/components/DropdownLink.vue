<template>
  <div class="dropdown-link" :class="{ open }">
    <button
      class="dropdown-link__title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
      @mouseenter="handleButtonMouseEnter"
      @mouseleave="handleButtonMouseLeave"
    >
      <Xicons class="title" :icon="item.icon" :text="item.text" />
      <span v-if="item.text" class="arrow down" />
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
                  @focusout="
                    isLastItemOfArray(grandchild, child.children) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <Link
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavGroup, NavItem } from '../../types'
import Link from './Link.vue'
import DropdownTransition from './DropdownTransition.vue'

const props = defineProps({
  item: {
    type: Object as PropType<NavGroup<NavItem>>,
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

/**
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = (e): void => {
  const isTriggerByTab = e.detail === 1
  if (isTriggerByTab) {
    open.value = !open.value
  } else {
    open.value = false
  }
}

const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
  arr[arr.length - 1] === item




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
</script>
