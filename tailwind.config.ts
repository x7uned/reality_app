import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'selector',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				body: 'var(--body-bg)',
				bg: 'var(--bg)',
				bg2: 'var(--bg2)',
				first: 'var(--first)',
				second: 'var(--second)',
				text: 'var(--text)',
				reverseText: 'var(--reverse-text)',
				subtext: 'var(--subtext)',
				border: 'var(--border)',
				selection: 'var(--selection)',
			},
		},
	},
	plugins: [],
}
export default config
