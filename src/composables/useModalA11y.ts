import { onBeforeUnmount, watch, type Ref } from 'vue'

function getFocusable(root: HTMLElement): HTMLElement[] {
  const nodes = root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  return Array.from(nodes).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

export interface ModalA11yOptions {
  isOpen: Ref<boolean>
  dialogEl: Ref<HTMLElement | null>
  inertRoot?: Ref<HTMLElement | null>
  onRequestClose?: () => void
}

export function useModalA11y(options: ModalA11yOptions) {
  let restoreFocusEl: Element | null = null
  let prevOverflow = ''

  function setInert(inert: boolean) {
    const root = options.inertRoot?.value
    if (!root) return

    if (inert) {
      root.setAttribute('aria-hidden', 'true')
      // `inert` is widely supported in modern Chromium; safe to set regardless.
      ;(root as any).inert = true
    } else {
      root.removeAttribute('aria-hidden')
      ;(root as any).inert = false
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    const dialog = options.dialogEl.value
    if (!dialog) return

    const focusable = getFocusable(dialog)
    if (focusable.length === 0) {
      e.preventDefault()
      dialog.focus()
      return
    }

    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!
    const active = document.activeElement

    if (e.shiftKey) {
      if (active === first || active === dialog) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  function open() {
    restoreFocusEl = document.activeElement
    prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setInert(true)

    const dialog = options.dialogEl.value
    if (dialog) {
      dialog.addEventListener('keydown', onKeyDown)
      // Let the template's autofocus/focus call run first.
      queueMicrotask(() => {
        const focusable = getFocusable(dialog)
        ;(focusable[0] ?? dialog).focus()
      })
    }
  }

  function close() {
    const dialog = options.dialogEl.value
    if (dialog) {
      dialog.removeEventListener('keydown', onKeyDown)
    }

    document.body.style.overflow = prevOverflow
    setInert(false)

    if (restoreFocusEl instanceof HTMLElement) {
      restoreFocusEl.focus()
    }
    restoreFocusEl = null
  }

  watch(
    () => options.isOpen.value,
    (isOpen) => {
      if (isOpen) open()
      else close()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    close()
  })

  return {
    requestClose: () => options.onRequestClose?.(),
  }
}
