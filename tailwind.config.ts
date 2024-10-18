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
				secondBg: 'var(--second-bg)',
				first: 'var(--first)',
				second: 'var(--second)',
				text: 'var(--text)',
				reverseText: 'var(--reverse-text)',
				subtext: 'var(--subtext)',
				border: 'var(--border)',
			},
		},
	},
	plugins: [],
}
export default config
