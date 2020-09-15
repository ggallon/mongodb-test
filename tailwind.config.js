module.exports = {
  future: 'all',
  purge: {
    mode: 'all',
    content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    preserveHtmlElements: true,
    options: {
      keyframes: true
    }
  },
  theme: {},
  variants: {},
  plugins: [require('@tailwindcss/ui')]
};
