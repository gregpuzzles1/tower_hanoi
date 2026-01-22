<template>
  <div class="page">
    <div class="panel">
      <div class="stats">
        <div><strong>Discs:</strong> {{ game.state.discCount }}</div>
        <div><strong>Moves:</strong> {{ game.state.moveCount }} / {{ game.minimumMoves }}</div>
        <div><strong>Status:</strong> {{ game.state.status }}</div>
      </div>
    </div>
    <GameBoard />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../composables/gameStore'
import GameBoard from '../components/GameBoard.vue'

const game = useGameStore()
</script>

<style scoped>
.page {
  padding-bottom: 6px;
}

.panel {
  margin: 16px 20px 10px;
  padding: 20px;
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
  background: var(--panel);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

</style>
