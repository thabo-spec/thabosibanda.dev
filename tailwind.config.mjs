/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',   // or 'media' — toggle via class on <html> for a theme switcher
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────────
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },

      // ── Custom Palette ─────────────────────────────────────
      colors: {
        navy: {
          950: '#060e1a',
          900: '#0a1628',
          800: '#0f2035',
          700: '#162a45',
          600: '#1e3a5f',
        },
        steel: {
          600: '#2a4a70',
          500: '#334e6e',
          400: '#4a6a8a',
          300: '#6b8fad',
          200: '#94b4cc',
          100: '#c5d8e8',
        },
        ice: {
          600: '#2980b9',
          500: '#3a90c8',
          400: '#4a9eca',
          300: '#6db4d8',
          200: '#9acce6',
          100: '#cce4f3',
        },
        mint: {
          600: '#00a882',
          500: '#00be95',
          400: '#00d4aa',
          300: '#33debb',
          200: '#80ebcf',
          100: '#ccf5ea',
        },
        // Standard amber/red extend naturally from Tailwind defaults
      },

      // ── Typography Scale ───────────────────────────────────
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem,   4vw, 3rem)',   { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)',{ lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ── Max Widths ─────────────────────────────────────────
      maxWidth: {
        'prose-sm': '60ch',
        'prose':    '72ch',
        'prose-lg': '80ch',
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },

      // ── Animation ──────────────────────────────────────────
      animation: {
        'fade-up':   'fadeUp 0.5s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink':     'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(74,158,202,0.1)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,170,0.2)',
        'glow-mint':  '0 0 20px rgba(0,212,170,0.15)',
        'glow-ice':   '0 0 20px rgba(74,158,202,0.15)',
      },

      // ── Background Images ──────────────────────────────────
      backgroundImage: {
        'grid-navy': `
          linear-gradient(rgba(74,158,202,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,158,202,0.04) 1px, transparent 1px)
        `,
        'gradient-hero': 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0f2035 100%)',
        'gradient-card': 'linear-gradient(135deg, #162a45 0%, rgba(0,212,170,0.04) 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
