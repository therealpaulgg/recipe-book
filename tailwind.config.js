import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			body: ["Lato"],
			mono: ["Fira Code"]
		}
	},
	plugins: [
		forms
	]
};
