<template>
  <div class="dropdown-link" :class="{ open }">
    <button
      class="dropdown-link__title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{item.text}}</span>
      <span v-if="item.text" class="arrow down" />
    </button>

    <button
      class="dropdown-link--mobile__title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{item.text}}</span>
      <span v-if="item.text" class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="dropdown-link__container">
        <li
          v-for="(child, index) in item.children"
          :key="child.link || index"
          class="dropdown-link__item"
        >
          <template v-if="child.children">
            <h5 class="dropdown-link__subtitle">
              {{child.text}}
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
