<script setup lang="ts">
defineProps<{
  onNewGame: () => void
}>()
</script>

<template>
  <header class="topbar">
    <div class="title">Tower of Hanoi</div>
    <button class="newgame" type="button" @click="onNewGame">New Game ▼</button>
  </header>
</template>

<style scoped>
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--panel-border);
  background: linear-gradient(90deg, rgba(124, 92, 255, 0.12), rgba(0, 212, 255, 0.06));
}

.title {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.newgame {
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.06);
  color: var(--fg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out);
}

.newgame:active {
  transform: translateY(1px);
}
</style>
