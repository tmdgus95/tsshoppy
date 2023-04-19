/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: '#F96162',
            },
            backgroundImage: {
                banner: `url('../public/images/banner.jpg')`,
            },
        },
    },
    plugins: [],
};
