/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '24px',
        screens: {
          'xl': '1200px',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        'lmv': {
          'bg': 'var(--lmv-bg)',
          'base': 'var(--lmv-base)',
          'muted': 'var(--lmv-muted)',
          'accent': 'var(--lmv-accent)',
          'accentQuiet': 'var(--lmv-accentQuiet)',
          'success': 'var(--lmv-success)',
        },
      },
    },
  },
  plugins: [],
}