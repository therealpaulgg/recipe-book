module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			body: ["Lato"],
			mono: ["Fira Code"]
		}
	},
	plugins: [
		require("@tailwindcss/custom-forms")
	]
};
