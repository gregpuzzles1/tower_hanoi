import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import './styles/theme.css'
import './styles/base.css'

// Normalize old hash-router links like /#/ so shared/bookmarked URLs stay clean.
if (window.location.hash.startsWith('#/')) {
	const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
	const hashPath = window.location.hash.slice(1)
	const normalizedHashPath = hashPath.startsWith('/') ? hashPath : `/${hashPath}`
	window.history.replaceState(
		window.history.state,
		'',
		`${basePath}${normalizedHashPath}${window.location.search}`,
	)
}

createApp(App).use(router).mount('#app')
