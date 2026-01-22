<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size: number
  discCount: number
  isTop: boolean
  tooltip?: string | null
  jiggle?: boolean
}>()

const widthPercent = computed(() => {
  const min = 38
  const max = 96
  if (props.discCount <= 1) return max
  const t = (props.size - 1) / (props.discCount - 1)
  return min + t * (max - min)
})

const color = computed(() => {
  const colors = ['#ff5c8a', '#ffb020', '#32d583', '#00d4ff', '#7c5cff', '#f97066', '#a6a6ff']
  return colors[Math.max(1, Math.min(7, props.size)) - 1]
})
</script>

<template>
  <div
    class="disc"
    :class="{ top: isTop, 'hanoi-jiggle': !!jiggle }"
    :style="{ width: widthPercent + '%', background: color }"
  >
    <div v-if="tooltip" class="tooltip" role="status" aria-live="polite">{{ tooltip }}</div>
  </div>
</template>

<style scoped>
.disc {
  position: relative;
  height: 22px;
  border-radius: 999px;
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  opacity: 0.98;
}

.disc.top {
  outline: 1px solid rgba(255, 255, 255, 0.22);
}

.tooltip {
  position: absolute;
  left: 50%;
  top: -34px;
  transform: translateX(-50%);
  max-width: min(280px, calc(100vw - 24px));
  white-space: normal;
  text-align: center;
  line-height: 1.25;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.72);
  color: white;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
