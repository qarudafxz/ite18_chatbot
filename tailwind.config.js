/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["Poppins", "sans-serif"],
			},
			maxHeight: {
				main: "80%",
			},
		},
	},
	plugins: [],
};
