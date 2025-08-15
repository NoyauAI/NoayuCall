/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        'primary-hover': '#2779bd',
        secondary: '#6c757d',
        'secondary-hover': '#5a6268',
        success: '#28a745',
        'success-hover': '#218838',
        danger: '#dc3545',
        'danger-hover': '#c82333',
        warning: '#ffc107',
        'warning-hover': '#e0a800',
        info: '#17a2b8',
        'info-hover': '#138496',
        dark: '#343a40',
        'dark-hover': '#23272b',
        light: '#f8f9fa',
        'light-hover': '#e2e6ea',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
