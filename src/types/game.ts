export type TowerId = 0 | 1 | 2

export type GameStatus = 'idle' | 'playing' | 'won'

export interface Disc {
  /** 1 is smallest; discCount is largest */
  size: number
}

export interface Move {
  fromTowerId: TowerId
  toTowerId: TowerId
  discSize: number
}

export type SelectionState =
  | { kind: 'none' }
  | { kind: 'sourceSelected'; sourceTowerId: TowerId }

export type AnimationState =
  | { kind: 'idle' }
  | { kind: 'movingDisc'; discSize: number; fromTowerId: TowerId; toTowerId: TowerId }

export interface InvalidMoveFeedback {
  discSize: number
  fromTowerId: TowerId
  toTowerId: TowerId
  message: string
  shownAt: number
}

export interface GameState {
  discCount: number
  towers: [number[], number[], number[]]
  moveCount: number
  status: GameStatus
  selection: SelectionState
  focusedTowerId: TowerId
  animation: AnimationState
  invalidMove: InvalidMoveFeedback | null
  startedAt: number | null
  completedAt: number | null
}

export function minMoves(discCount: number): number {
  return 2 ** discCount - 1
}

export function topDiscSize(tower: number[]): number | null {
  return tower.length ? tower[tower.length - 1]! : null
}

export function isTowerOrdered(tower: number[]): boolean {
  for (let i = 1; i < tower.length; i++) {
    if (tower[i]! >= tower[i - 1]!) return false
  }
  return true
}

export function isSolved(towers: [number[], number[], number[]], discCount: number): boolean {
  // Win condition: all discs on tower 1 or tower 2 (not the starting tower 0)
  return (towers[1].length === discCount && isTowerOrdered(towers[1])) ||
         (towers[2].length === discCount && isTowerOrdered(towers[2]))
}

export function isLegalMove(
  towers: [number[], number[], number[]],
  fromTowerId: TowerId,
  toTowerId: TowerId,
): { ok: true; discSize: number } | { ok: false; reason: 'sameTower' | 'emptySource' | 'largerOnSmaller' } {
  if (fromTowerId === toTowerId) return { ok: false, reason: 'sameTower' }

  const fromTop = topDiscSize(towers[fromTowerId])
  if (fromTop == null) return { ok: false, reason: 'emptySource' }

  const toTop = topDiscSize(towers[toTowerId])
  if (toTop == null) return { ok: true, discSize: fromTop }

  if (fromTop < toTop) return { ok: true, discSize: fromTop }
  return { ok: false, reason: 'largerOnSmaller' }
}
