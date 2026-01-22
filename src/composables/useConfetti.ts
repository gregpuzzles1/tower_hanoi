let singleton: { fire: () => Promise<void> } | null = null

export function useConfetti() {
  if (singleton) return singleton

  let instance: any | null = null

  async function fire() {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

    const { default: JSConfetti } = await import('js-confetti')
    if (!instance) instance = new JSConfetti()

    instance.addConfetti({
      confettiRadius: 5,
      confettiNumber: 220,
    })
  }

  singleton = { fire }
  return singleton
}
