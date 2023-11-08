/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#B0C478",
                primaryLight: "#F3F8ED",
                primaryDark: "#A3AE5C",
                secondary: {},
                black: {},
                red: { 50: "#FFF3F5", 100: "#FCE0E0", 400: "#F44336" },
                orange: { 400: "#F57C00" },
                yellow: { 100: "#FFF3E0", 400: "#FF9800" },
                borderColor: "#C3C3BF",
                light: "#C3C3BF",
                errorLight: "#FFF6F4",
                error: "#E05744",
                mediumGray: "#838481",
                // white: "#fff",
                dark: "#343839",
            },
            fontFamily: {
                Adam: ["Adam", "sans-serif"],
            },
        },
    },
    plugins: [],
};
