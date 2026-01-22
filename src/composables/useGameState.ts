import { computed, reactive } from 'vue'

import type { GameState, Move, TowerId } from '../types/game'
import { isLegalMove, isSolved, topDiscSize } from '../types/game'

const INVALID_MOVE_MESSAGE = "Larger discs can't be placed on smaller ones."

function initialTower(discCount: number): number[] {
  return Array.from({ length: discCount }, (_, i) => discCount - i)
}

function clampDiscCount(value: number): number {
  return Math.min(7, Math.max(3, value))
}

export function useGameState() {
  let pendingMove: Move | null = null

  const state = reactive<GameState>({
    discCount: 4,
    towers: [initialTower(4), [], []],
    moveCount: 0,
    status: 'idle',
    selection: { kind: 'none' },
    focusedTowerId: 0,
    animation: { kind: 'idle' },
    invalidMove: null,
    startedAt: null,
    completedAt: null,
  })

  const minimumMoves = computed(() => 2 ** state.discCount - 1)

  function reset(discCount: number) {
    const clamped = clampDiscCount(discCount)
    state.discCount = clamped
    state.towers = [initialTower(clamped), [], []]
    state.moveCount = 0
    state.status = 'playing'
    state.selection = { kind: 'none' }
    state.focusedTowerId = 0
    state.animation = { kind: 'idle' }
    state.invalidMove = null
    state.startedAt = Date.now()
    state.completedAt = null
  }

  function clearSelection() {
    state.selection = { kind: 'none' }
  }

  function selectSource(towerId: TowerId) {
    if (state.animation.kind !== 'idle') return

    const top = topDiscSize(state.towers[towerId])
    if (top == null) return

    if (state.selection.kind === 'sourceSelected' && state.selection.sourceTowerId === towerId) {
      clearSelection()
      return
    }

    state.selection = { kind: 'sourceSelected', sourceTowerId: towerId }
    state.focusedTowerId = towerId
  }

  function focusTower(towerId: TowerId) {
    state.focusedTowerId = towerId
  }

  function focusNext(delta: -1 | 1) {
    const next = (((state.focusedTowerId + delta) % 3) + 3) % 3
    state.focusedTowerId = next as TowerId
  }

  function showInvalidMove(discSize: number, fromTowerId: TowerId, toTowerId: TowerId) {
    state.invalidMove = {
      discSize,
      fromTowerId,
      toTowerId,
      message: INVALID_MOVE_MESSAGE,
      shownAt: Date.now(),
    }

    // Hide after a short delay
    const shownAt = state.invalidMove.shownAt
    setTimeout(() => {
      // Only clear if it's the same instance (avoid clearing newer feedback)
      if (state.invalidMove?.shownAt === shownAt) {
        state.invalidMove = null
      }
    }, 2500)
  }

  function tryMove(fromTowerId: TowerId, toTowerId: TowerId, options?: { deferCommit?: boolean }): Move | null {
    if (state.animation.kind !== 'idle') return null

    const legality = isLegalMove(state.towers, fromTowerId, toTowerId)
    if (!legality.ok) {
      if (legality.reason === 'largerOnSmaller') {
        const discSize = topDiscSize(state.towers[fromTowerId])
        if (discSize != null) {
          showInvalidMove(discSize, fromTowerId, toTowerId)
        }
      }
      clearSelection()
      return null
    }

    const discSize = legality.discSize

    pendingMove = { fromTowerId, toTowerId, discSize }
    state.animation = { kind: 'movingDisc', discSize, fromTowerId, toTowerId }

    clearSelection()

    if (!options?.deferCommit) {
      commitPendingMove()
    }

    return pendingMove
  }

  function commitPendingMove() {
    if (!pendingMove) return
    if (state.animation.kind !== 'movingDisc') {
      pendingMove = null
      return
    }

    const { fromTowerId, toTowerId, discSize } = pendingMove
    pendingMove = null

    state.towers[fromTowerId].pop()
    state.towers[toTowerId].push(discSize)
    state.moveCount += 1

    const won = isSolved(state.towers, state.discCount)
    if (won) {
      state.status = 'won'
      state.completedAt = Date.now()
    } else {
      state.status = 'playing'
    }

    setTimeout(() => {
      state.animation = { kind: 'idle' }
    }, 220)
  }

  function dropToFocused() {
    if (state.selection.kind !== 'sourceSelected') return
    tryMove(state.selection.sourceTowerId, state.focusedTowerId)
  }

  function cancelSelection() {
    clearSelection()
  }

  return {
    state,
    minimumMoves,
    reset,
    selectSource,
    focusTower,
    focusNext,
    tryMove,
    commitPendingMove,
    dropToFocused,
    cancelSelection,
  }
}
