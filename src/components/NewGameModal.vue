<script setup lang="ts">
import { computed, ref } from 'vue'

import { useModalA11y } from '../composables/useModalA11y'
import { minMoves } from '../types/game'

const props = defineProps<{
  initialDiscCount: number
  onStart: (discCount: number) => void
  onCancel: () => void
  inertRoot?: HTMLElement | null
}>()

const discCount = ref(props.initialDiscCount)
const minimumMoves = computed(() => minMoves(discCount.value))

function dec() {
  discCount.value = Math.max(3, discCount.value - 1)
}

function inc() {
  discCount.value = Math.min(7, discCount.value + 1)
}

const dialogRef = ref<HTMLDivElement | null>(null)

useModalA11y({
  isOpen: computed(() => true),
  dialogEl: dialogRef,
  inertRoot: computed(() => props.inertRoot ?? null),
  onRequestClose: props.onCancel,
})
</script>

<template>
  <div class="backdrop" @click.self="onCancel" aria-hidden="true"></div>

  <div
    ref="dialogRef"
    class="dialog"
    role="dialog"
    aria-modal="true"
    aria-label="New game"
    tabindex="-1"
    @keydown.esc.prevent="onCancel"
  >
    <h2 class="heading">New Game</h2>

    <div class="row">
      <div class="label">Discs:</div>
      <div class="control">
        <button type="button" class="step" @click="dec" aria-label="Decrease discs">-</button>
        <div class="value" aria-live="polite">{{ discCount }}</div>
        <button type="button" class="step" @click="inc" aria-label="Increase discs">+</button>
      </div>
    </div>

    <div class="row">
      <div class="label">Minimum moves:</div>
      <div class="value">{{ minimumMoves }}</div>
    </div>

    <div class="actions">
      <button type="button" class="primary" @click="onStart(discCount)">Start</button>
      <button type="button" class="secondary" @click="onCancel">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20;
}

.dialog {
  position: fixed;
  z-index: 21;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(520px, calc(100vw - 32px));
  background: rgba(16, 24, 46, 0.96);
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
  padding: 18px;
  outline: none;
}

.heading {
  margin: 0 0 12px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
}

.label {
  opacity: 0.9;
}

.control {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.step {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.06);
  color: var(--fg);
  cursor: pointer;
}

.value {
  min-width: 40px;
  text-align: center;
  font-weight: 700;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 12px;
}

.primary,
.secondary {
  border-radius: 12px;
  padding: 10px 14px;
  border: 1px solid var(--panel-border);
  cursor: pointer;
}

.primary {
  background: rgba(124, 92, 255, 0.25);
  color: var(--fg);
}

.secondary {
  background: rgba(255, 255, 255, 0.06);
  color: var(--fg);
}
</style>
