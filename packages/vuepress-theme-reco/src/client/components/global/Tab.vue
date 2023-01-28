<script lang="ts">
import { defineComponent, h, ref, useSlots } from 'vue'
// @ts-ignore
import Xicons from './Xicons.vue'

export default defineComponent({
  name: 'Tab',
  setup() {
    const slots = useSlots()
    // index of current active item
    const activeIndex = ref(0)

    return () => {
      const items = (slots.default?.() || []).map(vnode => {
        if (!vnode.props) vnode.props = {}
        return vnode
      })

      // do not render anything if there is no tab-item
      if (items.length === 0) {
        return null
      }

      // set the active item
      items.forEach((vnode, i) => {
        vnode.props.active = i === activeIndex.value
      })

      return h('div', { class: 'tab' }, [
        h(
          'div',
          { class: 'tab__nav' },
          h(
            'ul',
            { class: 'tab__ul' },
            items.map((vnode, i) => {
              const isActive = i === activeIndex.value
              return h(
                'li',
                { class: 'tab__li' },
                h(
                  'button',
                  {
                    class: {
                      'tab__nav-tab': true,
                      'tab__nav-tab-active': isActive,
                    },
                    onClick: () => (activeIndex.value = i),
                  },
                  h(Xicons, {
                    icon: 'Sitemap',
                    text: vnode.props.title,
                    'text-size': 12,
                  }),
                ),
              )
            }),
          ),
        ),
        items,
      ])
    }
  },
})
</script>

<style>
@import url('@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css');

.tab {
  @apply relative my-6 overflow-hidden border-block;
  .tab__nav {
    .tab__ul {
      @apply pl-0 my-0 list-none;
      .tab__li {
        @apply inline-block;
        button {
          @apply px-3.5 py-2.5 border-b-2 border-solid border-transparent text-basic cursor-pointer text-sm;
          .icon-container {
            @apply text-basic align-middle;
          }
          &.tab__nav-tab-active {
            @apply border-reco-primary !important;
          }
        }
      }
    }
  }
}
</style>
