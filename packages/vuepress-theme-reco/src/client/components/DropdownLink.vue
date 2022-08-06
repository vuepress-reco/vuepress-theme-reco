<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <Xicons
        :icon="item.icon"
        icon-size="20"
      />
      {{item.text}}
      <span v-if="item.text" class="arrow down" />
    </button>

    <button
      class="mobile-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <Xicons
        :icon="item.icon"
        icon-size="20"
      />
      {{item.text}}
      <span v-if="item.text" class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(child, index) in item.children"
          :key="child.link || index"
          class="dropdown-item"
        >
          <template v-if="child.children">
            <h5 class="dropdown-subtitle">
              <Xicons
                :icon="child.icon"
                icon-size="20"
              />
              {{child.text}}
            </h5>

            <ul class="dropdown-subitem-wrapper">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="dropdown-subitem"
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

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavGroup, NavItem } from '../../types'
import Link from './Link.vue'
import DropdownTransition from './DropdownTransition.vue'

export default defineComponent({
  name: 'DropdownLink',

  components: {
    Link,
    DropdownTransition,
  },

  props: {
    item: {
      type: Object as PropType<NavGroup<NavItem>>,
      required: true,
    },
  },

  setup(props) {
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
      const isTriggerByTab = e.detail === 0
      if (isTriggerByTab) {
        open.value = !open.value
      } else {
        open.value = false
      }
    }

    const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
      arr[arr.length - 1] === item

    return {
      open,
      dropdownAriaLabel,
      handleDropdown,
      isLastItemOfArray,
    }
  },
})
</script>
