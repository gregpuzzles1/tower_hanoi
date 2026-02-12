export const howToPlay =
  'Goal: move the entire stack from the left tower to either the middle or right tower. Rules: move only one disc at a time, and never place a larger disc on a smaller disc.\n\nMouse/touch: click (or tap) a source tower to pick up its top disc (the smallest disc currently on that tower), then click (or tap) a destination tower to drop it there. Click the same tower again to cancel your selection.\n\nKeyboard: press 1/2/3 to choose a source tower, use Left/Right to change the destination focus, then press Enter or Space to drop. Press Esc to cancel selection.'

export const history: string[] = [
  'The Tower of Hanoi is a classic mathematical puzzle first introduced to the public in the late 19th century. It features three pegs and a set of discs of different sizes that begin stacked on one peg.',
  'The puzzle is often used to teach recursion and problem decomposition: the optimal strategy for n discs can be built from the optimal strategy for n-1 discs.'
]

export const applications: string[] = [
  'Beyond being a puzzle, Tower of Hanoi has connections to algorithms and data structures, including recursive problem solving, stack-like behavior, and reasoning about state transitions.',
  'It is also used as a benchmark problem in education to demonstrate complexity growth: the minimum number of moves doubles with each additional disc.'
]
