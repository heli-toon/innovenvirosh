/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5E40',
          light: '#3B7A52',
          dark: '#1F4430',
        },
        secondary: {
          DEFAULT: '#8B5A2B',
          light: '#A67939',
          dark: '#704821',
        },
        accent: {
          DEFAULT: '#7CB342',
          light: '#8EC74F',
          dark: '#629035',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        gray: {
          100: '#F5F7F9',
          200: '#E1E8ED',
          300: '#C8D4DE',
          400: '#A3B4C2',
          500: '#7E8FA0',
          600: '#5A6978',
          700: '#3D4B59',
          800: '#2D3843',
          900: '#1A232E',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      height: {
        'screen-75': '75vh',
        'screen-85': '85vh',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        'cta-pattern': "url('https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?auto=compress&cs=tinysrgb&w=1920')",
      },
    },
  },
  plugins: [],
};