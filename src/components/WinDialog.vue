<script setup lang="ts">
defineProps<{
  moveCount: number
  minimumMoves: number
  onClose: () => void
  onNewGame: () => void
}>()
</script>

<template>
  <div class="backdrop" aria-hidden="true"></div>
  <div class="dialog" role="dialog" aria-modal="true" aria-label="You win">
    <h2 class="heading">You solved it!</h2>
    <p class="sub">Moves: <strong>{{ moveCount }}</strong> (minimum: {{ minimumMoves }})</p>

    <div class="actions">
      <button type="button" class="primary" @click="onNewGame">New Game</button>
      <button type="button" class="secondary" @click="onClose">Close</button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 30;
}

.dialog {
  position: fixed;
  z-index: 31;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(520px, calc(100vw - 32px));
  background: rgba(16, 24, 46, 0.96);
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
  padding: 18px;
}

.heading {
  margin: 0 0 6px;
}

.sub {
  margin: 0 0 14px;
  opacity: 0.95;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
