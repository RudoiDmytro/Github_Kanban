import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		waitForAnimations: false,
		baseUrl: 'http://localhost:3000'
	},
	component: {
		waitForAnimations: false
	},
	viewportWidth: 1600,
	viewportHeight: 900,
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite'
		}
	}
})
