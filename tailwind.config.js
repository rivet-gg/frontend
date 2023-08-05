/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts}'],
	theme: {
		// fontFamily: {
		// 	sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
		// 	display: ['Cartridge', 'ui-sans-serif', 'system-ui'],
		// 	pixel: ['Silkscreen', 'ui-sans-serif', 'system-ui']
		// },
		extend: {
			translate: {
				'.05': '.05rem'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
	]
};
