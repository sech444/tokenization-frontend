/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Integrate with our optimized theme system
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#374151',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          DEFAULT: '#059669',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Surface colors
        surface: {
          DEFAULT: '#f8fafc',
          elevated: '#ffffff',
          hover: '#f1f5f9',
          muted: '#e2e8f0',
        },
        // Text colors
        text: {
          primary: '#111827',
          secondary: '#374151',
          tertiary: '#6b7280',
          muted: '#9ca3af',
          inverse: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.08)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.12), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.18), 0 4px 6px -4px rgb(0 0 0 / 0.12)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.20), 0 8px 10px -6px rgb(0 0 0 / 0.15)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(1rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-1rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      content: {
        'empty': '""',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Text rendering optimizations
        '.text-crisp': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
        },
        // Glass morphism
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.glass-dark': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        // Performance optimizations
        '.gpu-accelerated': {
          'transform': 'translateZ(0)',
          'backface-visibility': 'hidden',
          'perspective': '1000px',
        },
        // Scrollbar utilities
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
        // Performance optimization
        '.content-auto': {
          'contain': 'layout style paint',
        },
        // Focus utilities
        '.focus-ring': {
          '&:focus-visible': {
            'outline': '2px solid theme("colors.primary.600")',
            'outline-offset': '2px',
            'border-radius': theme('borderRadius.sm'),
          },
        },
        // Text utilities - removed text-wrap for compatibility
        '.text-balance': {
          'word-wrap': 'break-word',
        },
        '.text-pretty': {
          'word-wrap': 'break-word',
        },
      }
      addUtilities(newUtilities)
    },
    // Add component classes
    function({ addComponents, theme }) {
      const components = {
        // Enhanced button components
        '.btn': {
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': theme('spacing.2'),
          'padding': `${theme('spacing.3')} ${theme('spacing.6')}`,
          'font-size': theme('fontSize.sm[0]'),
          'font-weight': theme('fontWeight.medium'),
          'line-height': '1',
          'text-decoration': 'none',
          'border': '1px solid transparent',
          'border-radius': theme('borderRadius.lg'),
          'cursor': 'pointer',
          'transition': 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          'white-space': 'nowrap',
          'user-select': 'none',
          'outline': 'none',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          '&:disabled': {
            'opacity': '0.5',
            'cursor': 'not-allowed',
            'pointer-events': 'none',
          },
          '&:focus-visible': {
            'outline': `2px solid ${theme('colors.primary.600')}`,
            'outline-offset': '2px',
          },
        },
        '.btn-primary': {
          'background': `linear-gradient(135deg, ${theme('colors.primary.800')} 0%, ${theme('colors.primary.600')} 50%, ${theme('colors.primary.500')} 100%)`,
          'color': theme('colors.white'),
          'border-color': theme('colors.primary.600'),
          'box-shadow': theme('boxShadow.sm'),
          '&:hover:not(:disabled)': {
            'box-shadow': theme('boxShadow.lg'),
            'transform': 'translateY(-1px)',
          },
        },
        '.btn-secondary': {
          'background-color': theme('colors.surface.elevated'),
          'color': theme('colors.text.primary'),
          'border-color': theme('colors.gray.300'),
          'box-shadow': theme('boxShadow.sm'),
          '&:hover:not(:disabled)': {
            'background-color': theme('colors.surface.hover'),
            'border-color': theme('colors.gray.400'),
            'box-shadow': theme('boxShadow.md'),
            'transform': 'translateY(-1px)',
          },
        },
        // Enhanced card components
        '.card': {
          'background-color': theme('colors.white'),
          'border': `1px solid ${theme('colors.gray.200')}`,
          'border-radius': theme('borderRadius.xl'),
          'box-shadow': theme('boxShadow.sm'),
          'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          'overflow': 'hidden',
          '&:hover': {
            'box-shadow': theme('boxShadow.lg'),
            'border-color': theme('colors.gray.300'),
            'transform': 'translateY(-2px)',
          },
        },
        '.card-header': {
          'padding': theme('spacing.6'),
          'border-bottom': `1px solid ${theme('colors.gray.200')}`,
          'background-color': theme('colors.gray.50'),
        },
        '.card-body': {
          'padding': theme('spacing.6'),
        },
        '.card-footer': {
          'padding': theme('spacing.6'),
          'border-top': `1px solid ${theme('colors.gray.200')}`,
          'background-color': theme('colors.gray.50'),
        },
      }
      addComponents(components)
    },
  ],
}