<script setup lang="ts">
import type { InvalidMoveFeedback, TowerId } from '../types/game'
import DiscView from './DiscView.vue'
import { ref } from 'vue'

const props = defineProps<{
  towerId: TowerId
  discCount: number
  discs: number[]
  isSelected: boolean
  isFocused: boolean
  invalidMove: InvalidMoveFeedback | null
  onActivate: () => void
}>()

const root = ref<HTMLElement | null>(null)
defineExpose({ root })

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    props.onActivate()
  }
}
</script>

<template>
  <div
    ref="root"
    class="tower"
    :class="{ selected: isSelected, focused: isFocused }"
    role="button"
    tabindex="0"
    :aria-label="`Tower ${towerId + 1}`"
    @click="onActivate"
    @keydown="onKeyDown"
  >
    <div class="rod" aria-hidden="true"></div>

    <div class="discs" aria-hidden="true">
      <DiscView
        v-for="size in discs"
        :key="size"
        class="disc"
        :size="size"
        :disc-count="discCount"
        :is-top="size === discs[discs.length - 1]"
        :tooltip="
          size === discs[discs.length - 1] &&
          props.invalidMove &&
          props.invalidMove.fromTowerId === towerId &&
          props.invalidMove.discSize === size
            ? props.invalidMove.message
            : null
        "
        :jiggle="
          !!(
            size === discs[discs.length - 1] &&
            props.invalidMove &&
            props.invalidMove.fromTowerId === towerId &&
            props.invalidMove.discSize === size
          )
        "
        :data-size="size"
      />
    </div>

    <div class="base" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.tower {
  position: relative;
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
  min-height: 320px;
  background: var(--panel);
  outline: none;
  cursor: pointer;
  user-select: none;
  transition:
    border-color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}

.tower:active {
  transform: translateY(1px);
}

.tower.focused {
  border-color: rgba(124, 92, 255, 0.7);
  box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.18);
}

.tower.selected {
  border-color: rgba(0, 212, 255, 0.7);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.14);
}

.rod {
  position: absolute;
  left: 50%;
  top: 18px;
  bottom: 22px;
  width: 10px;
  transform: translateX(-50%);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.18);
}

.base {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  height: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
}

.discs {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding-bottom: 4px;
}

.disc {
  transition: transform var(--dur-fast) var(--ease-out);
}

.tower.selected .disc[data-size]:last-child {
  transform: translateY(-6px);
}

@media (max-width: 640px) {
  .tower {
    min-height: 260px;
  }

  .rod {
    top: 14px;
  }

  .base {
    left: 12px;
    right: 12px;
  }
}
</style>
