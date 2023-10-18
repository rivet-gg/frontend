const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts}'],
	theme: {
		fontFamily: {
			sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
			display: ['Cartridge', 'ui-sans-serif', 'system-ui'],
			pixel: ['Silkscreen', 'ui-sans-serif', 'system-ui']
		},
		extend: {
			screens: {
				'mdLg': '1100px',
			},
			colors: {
				'button-bg-hover-color': '#ffffff05',
				'base-bg': '#18181b', // Also change this in html/index.html and html/static-styles.css
				'raised-bg': '#FFFFFF17',
				'raised-bg-border-color': '#525252',
				'lowered-bg': '#00000020',
				'context-menu': '#262626',
				'raised-hover': '#FFFFFF27',
				'muted-text': '#737373',
				'main-accent': '#7f56d9'
			},
			maxWidth: {
				contentwidth: '1100px'
			},
			translate: {
				'.05': '.05rem'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		plugin(function ({ addBase, theme }) {
			addBase({
				h1: { fontFamily: theme('fontFamily.display') },
				h2: { fontFamily: theme('fontFamily.display') },
				h3: { fontFamily: theme('fontFamily.display') }
			});
		})
	]
};
