import { Ref, ref } from 'vue'

export function useInitCopyBtn() {
  const codeNodes: Ref<NodeListOf<HTMLPreElement>> = ref([]) as unknown as Ref<NodeListOf<HTMLPreElement>>
  const addCopyBtnToCodeNode = () => {
    codeNodes.value.forEach((node) => {
      node.style.position = 'relative'

      const btn = document.createElement('span')
      btn.className = 'code-copy-btn'
      btn.style.position = 'absolute'
      btn.style.zIndex = '20'
      btn.style.top = '1px'
      btn.style.right = '1px'
      btn.style.display = 'display'
      btn.style.position = 'block'
      btn.style.cursor = 'pointer'
      btn.innerHTML =
        '<span class="copied">copied</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></g></svg>'

      const icon = btn.querySelector<SVGAElement>('svg') as SVGAElement
      icon.style.width = '20px'
      icon.style.verticalAlign = 'middle'

      const copied = btn.querySelector<HTMLSpanElement>('.copied') as HTMLSpanElement
      copied.style.verticalAlign = 'middle'
      copied.style.fontSize = '12px'
      copied.style.display = 'none'
      copied.style.marginRight = '4px'

      handleElement(btn)
      node.appendChild(btn)
    })
  }
  const initCopyBtn = () => {
    const nodes = document.querySelectorAll<HTMLPreElement>('div[class*="language-"] pre')
    codeNodes.value = nodes
    addCopyBtnToCodeNode()
  }

  return { codeNodes, initCopyBtn }
}

async function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '')

    // @ts-ignore
    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null

    document.body.appendChild(element)
    element.select()

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand('copy')
    document.body.removeChild(element)

    if (originalRange) {
      selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      ;(previouslyFocusedElement as HTMLElement).focus()
    }
  }
}

function handleElement(el: HTMLElement) {
  el.addEventListener('click', () => {
    const parent = el.parentElement

    if (!parent) {
      return
    }

    const isShell =
      parent.classList.contains('language-sh') ||
      parent.classList.contains('language-bash')

    let { innerText: text = '' } = parent

    if (isShell) {
      text = text.replace(/^ *\$ /gm, '')
    }

    copyToClipboard(text).then(() => {

      const copied = el.querySelector<HTMLSpanElement>('.copied') as HTMLSpanElement
      copied.style.display = 'inline-block'
      setTimeout(() => {
        copied.style.display = 'none'
      }, 3000)
    })
  })
}
