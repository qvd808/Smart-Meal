/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'deep-brown': '#431414',
				'deep-yellow': '#F4EB68',
				'light-yellow': '#F8FFC5',
				'grey': '#ECECEC',
				'white': '#FAFAFA',
				'black': '#1D1919',
			  },
			  fontFamily: {
				lato: "var(--font-lato)",
				nunito: "var(--font-nunito)"
			  }
		}
	},
	plugins: [
		// Add plugins here
		// require('@tailwindcss/forms'),
		// require('@tailwindcss/typography'),
	],
}
