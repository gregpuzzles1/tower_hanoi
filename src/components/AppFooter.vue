<script setup lang="ts">
import { computed } from 'vue'

const startYear = 2025
const currentYear = new Date().getFullYear()
const yearText = computed(() => (currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`))

const repoUrl = 'https://github.com/gregpuzzles1/tower_hanoi'
const issuesUrl = 'https://github.com/gregpuzzles1/tower_hanoi/issues/new'
const emailUrl = 'mailto:gregpuzzles1@gmail.com'

const base = import.meta.env.BASE_URL
const licenseUrl = base.endsWith('/') ? `${base}LICENSE` : `${base}/LICENSE`
</script>

<template>
  <footer class="footer">
    <div class="row">
      <div>© {{ yearText }} Greg Christian</div>
      <div class="links">
        <a :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="issuesUrl" target="_blank" rel="noreferrer">Issues</a>
        <a :href="emailUrl">Email</a>
        <a :href="licenseUrl">MIT License</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 20px;
  opacity: 0.92;
  max-width: 960px;
  margin: 0 auto;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid var(--panel-border);
  padding-top: 14px;
}

.links {
  display: inline-flex;
  gap: 12px;
}

a {
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

a:hover {
  border-bottom-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 640px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
