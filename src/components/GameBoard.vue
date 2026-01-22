<script setup lang="ts">
import { nextTick, ref } from 'vue'

import { useGameStore } from '../composables/gameStore'
import { useKeyboardControls } from '../composables/useKeyboardControls'
import type { TowerId } from '../types/game'
import TowerView from './TowerView.vue'
import DiscView from './DiscView.vue'

const game = useGameStore()
const { onKeyDown } = useKeyboardControls(game)

const boardRef = ref<HTMLElement | null>(null)
const towerEls = ref<Record<TowerId, HTMLElement | null>>({ 0: null, 1: null, 2: null })

const overlay = ref<
  | null
  | {
      discSize: number
      discCount: number
      start: DOMRect
      end: DOMRect
      stage: 'start' | 'end'
    }
>(null)

function setTowerEl(towerId: TowerId, el: unknown) {
  if (!el) {
    towerEls.value[towerId] = null
    return
  }

  if (el instanceof HTMLElement) {
    towerEls.value[towerId] = el
    return
  }

  if (typeof el === 'object' && el) {
    const anyEl = el as any
    const root = anyEl.root?.value ?? anyEl.root
    if (root instanceof HTMLElement) {
      towerEls.value[towerId] = root
      return
    }
    if (anyEl.$el instanceof HTMLElement) {
      towerEls.value[towerId] = anyEl.$el
      return
    }
  }

  towerEls.value[towerId] = null
}

function onTowerActivate(towerId: TowerId) {
  if (game.state.animation.kind !== 'idle') return

  game.focusTower(towerId)

  if (game.state.selection.kind === 'none') {
    game.selectSource(towerId)
    return
  }

  const source = game.state.selection.sourceTowerId
  if (source === towerId) {
    game.cancelSelection()
    return
  }

  void startAnimatedMove(source, towerId)
}

async function startAnimatedMove(fromTowerId: TowerId, toTowerId: TowerId) {
  const move = game.tryMove(fromTowerId, toTowerId, { deferCommit: true })
  if (!move) return

  await nextTick()

  const fromTowerEl = towerEls.value[fromTowerId]
  const toTowerEl = towerEls.value[toTowerId]
  const boardEl = boardRef.value
  if (!fromTowerEl || !toTowerEl || !boardEl) {
    game.commitPendingMove()
    return
  }

  const discEl = fromTowerEl.querySelector<HTMLElement>(`.disc[data-size="${move.discSize}"]`)
  if (!discEl) {
    game.commitPendingMove()
    return
  }

  const start = discEl.getBoundingClientRect()
  const end = toTowerEl.getBoundingClientRect()

  // Aim the disc for the top of the destination tower area.
  const endRect = new DOMRect(end.left + end.width / 2 - start.width / 2, end.top + 18, start.width, start.height)

  overlay.value = {
    discSize: move.discSize,
    discCount: game.state.discCount,
    start,
    end: endRect,
    stage: 'start',
  }

  await nextTick()
  requestAnimationFrame(() => {
    if (overlay.value) overlay.value.stage = 'end'
  })

  window.setTimeout(() => {
    overlay.value = null
    game.commitPendingMove()
  }, 220)
}

function overlayStyle() {
  const o = overlay.value
  if (!o) return {}

  const x = o.stage === 'start' ? o.start.x : o.end.x
  const y = o.stage === 'start' ? o.start.y : o.end.y

  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${o.start.width}px`,
    height: `${o.start.height}px`,
  }
}
</script>

<template>
  <section
    ref="boardRef"
    class="board"
    aria-label="Tower of Hanoi game"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <div class="towers">
      <TowerView
        v-for="towerId in [0, 1, 2]"
        :key="towerId"
        :ref="(el) => setTowerEl(towerId as 0 | 1 | 2, el)"
        :tower-id="towerId as 0 | 1 | 2"
        :disc-count="game.state.discCount"
        :discs="game.state.towers[towerId as 0 | 1 | 2]"
        :is-selected="game.state.selection.kind === 'sourceSelected' && game.state.selection.sourceTowerId === (towerId as 0 | 1 | 2)"
        :is-focused="game.state.focusedTowerId === (towerId as 0 | 1 | 2)"
        :invalid-move="game.state.invalidMove"
        :on-activate="() => onTowerActivate(towerId as 0 | 1 | 2)"
      />
    </div>

    <div v-if="overlay" class="overlay" :style="overlayStyle()" aria-hidden="true">
      <DiscView :size="overlay.discSize" :disc-count="overlay.discCount" :is-top="true" />
    </div>
  </section>
</template>

<style scoped>
.board {
  padding: 18px;
}

.towers {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.overlay {
  position: fixed;
  z-index: 10;
  transition:
    left var(--dur-med) var(--ease-out),
    top var(--dur-med) var(--ease-out);
  pointer-events: none;
}

@media (max-width: 640px) {
  .board {
    padding: 12px;
  }

  .towers {
    gap: 10px;
  }
}
</style>
