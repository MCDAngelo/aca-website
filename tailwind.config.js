/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Vintage Library Color Palette
        'library': {
          'brown': '#3E2723',      // Dark wood - primary text
          'saddle': '#8B4513',     // Saddle brown
          'wood': '#A0826D',       // Light wood
          'teal': '#4A7C7E',       // Library green/teal
          'cream': '#F5F1E8',      // Parchment background
          'parchment': '#FFF8E7',  // Light parchment
          'gold': '#B8860B',       // Aged gold/brass
          'burgundy': '#6B2C2C',   // Deep burgundy
          'brass': '#CD7F32',      // Antique brass
        }
      },
      fontFamily: {
        'serif': ['Libre Baskerville', 'Georgia', 'serif'],
        'sans': ['Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/eugenio-mazzone-6ywyo2qtaZ8-unsplash.jpg')",
      }
    },
  },
  plugins: [],
}
