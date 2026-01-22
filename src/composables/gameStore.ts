import { inject, provide } from 'vue'

import { useGameState } from './useGameState'

export type GameStore = ReturnType<typeof useGameState>

const GameStoreKey: unique symbol = Symbol('GameStore')

export function provideGameStore(store: GameStore) {
  provide(GameStoreKey, store)
}

export function useGameStore(): GameStore {
  const store = inject<GameStore>(GameStoreKey)
  if (!store) {
    throw new Error('GameStore was not provided')
  }
  return store
}
