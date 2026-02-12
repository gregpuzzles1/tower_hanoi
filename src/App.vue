<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'

import TopBar from './components/TopBar.vue'
import NewGameModal from './components/NewGameModal.vue'
import WinDialog from './components/WinDialog.vue'
import AppFooter from './components/AppFooter.vue'
import { howToPlay, history, applications } from './content/copy'
import { useConfetti } from './composables/useConfetti'
import { provideGameStore } from './composables/gameStore'
import { useGameState } from './composables/useGameState'

const game = useGameState()
provideGameStore(game)

const inertRoot = ref<HTMLElement | null>(null)
const isNewGameOpen = ref(false)
const isWinOpen = ref(false)

watch(
  () => game.state.status,
  (status) => {
    if (status === 'won') {
      isWinOpen.value = true
      void useConfetti().fire()
    }
  },
)

function openNewGame() {
  isNewGameOpen.value = true
}

function closeNewGame() {
  isNewGameOpen.value = false
}

function startNewGame(discCount: number) {
  isWinOpen.value = false
  game.reset(discCount)
  closeNewGame()
}

function closeWin() {
  isWinOpen.value = false
}

function newGameFromWin() {
  closeWin()
  openNewGame()
}
</script>

<template>
  <TopBar :on-new-game="openNewGame" />

  <main ref="inertRoot">
    <RouterView />

    <section class="content" aria-label="Learn more">
      <h2>How to play</h2>
      <p class="pre">{{ howToPlay }}</p>

      <h2>History</h2>
      <p v-for="(p, idx) in history" :key="idx">{{ p }}</p>

      <h2>Applications</h2>
      <p v-for="(p, idx) in applications" :key="idx">{{ p }}</p>
    </section>

    <AppFooter />
  </main>

  <NewGameModal
    v-if="isNewGameOpen"
    :initial-disc-count="game.state.discCount"
    :on-start="startNewGame"
    :on-cancel="closeNewGame"
    :inert-root="inertRoot"
  />

  <WinDialog
    v-if="isWinOpen"
    :move-count="game.state.moveCount"
    :minimum-moves="game.minimumMoves.value"
    :on-close="closeWin"
    :on-new-game="newGameFromWin"
  />
</template>

<style scoped>
main {
  padding-bottom: 80px;
}

.content {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px 0;
  margin-top: 32px;
}

@media (max-width: 640px) {
  .content {
    margin-top: 26px;
  }
}

h2 {
  margin: 10px 0 8px;
}

p {
  margin: 0 0 10px;
  opacity: 0.95;
  line-height: 1.5;
}

.pre {
  white-space: pre-line;
}
</style>
