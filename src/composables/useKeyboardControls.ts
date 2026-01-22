import type { Ref } from 'vue'

import type { GameStore } from './gameStore'
import type { TowerId } from '../types/game'

export function useKeyboardControls(game: GameStore, options?: { enabled?: Ref<boolean> }) {
  function isEnabled() {
    return options?.enabled ? options.enabled.value : true
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!isEnabled()) return

    const key = e.key

    if (key === 'Escape') {
      e.preventDefault()
      game.cancelSelection()
      return
    }

    if (key === 'ArrowLeft') {
      e.preventDefault()
      game.focusNext(-1)
      return
    }

    if (key === 'ArrowRight') {
      e.preventDefault()
      game.focusNext(1)
      return
    }

    if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      game.dropToFocused()
      return
    }

    if (key === '1' || key === '2' || key === '3') {
      e.preventDefault()
      const towerId = (Number(key) - 1) as TowerId
      game.focusTower(towerId)
      game.selectSource(towerId)
      return
    }
  }

  return { onKeyDown }
}
