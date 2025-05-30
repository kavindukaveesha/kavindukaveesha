/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Space Colors - Deep Blues
        "space": {
          "50": "#F8FAFF", // Stellar Blue
          "100": "#E6F0FF", // Ultra Light Blue
          "200": "#CFE0FF", // Pale Blue
          "300": "#B1C8FE", // Soft Blue
          "350": "#93B5FD", // Cosmic Mist Blue
          "400": "#7FA2FB", // Light Blue
          "450": "#6D8DF9", // Orbital Blue
          "500": "#5B7CF6", // Medium Blue
          "550": "#4A6BE8", // Supernova Blue
          "600": "#3D56DD", // Vibrant Blue
          "650": "#3347C1", // Gravitational Blue
          "700": "#283BA8", // Deep Blue
          "750": "#1E3582", // Interstellar Blue
          "800": "#1A2E6C", // Deep Cosmic Blue
          "850": "#102147", // Cosmic Midnight Blue
          "900": "#0A1836", // Galactic Core Blue
          "925": "#070F20", // Deep Space Abyss Blue
          "950": "#050914", // Cosmic Void Blue
        },

        // Nebula Colors - Cosmic Purples
        "nebula": {
          "100": "#EEEBFE", // Ultra Light Purple
          "200": "#DCD7FD", // Pale Purple
          "300": "#C8BFFC", // Soft Purple
          "350": "#B3A7FA", // Cosmic Mist Purple
          "400": "#9D8FF8", // Light Purple
          "450": "#8879F4", // Orbital Purple
          "500": "#7568F0", // Medium Purple
          "550": "#6355E7", // Supernova Purple
          "600": "#5747DA", // Vibrant Purple
          "650": "#4B3BC5", // Gravitational Purple
          "700": "#4335AF", // Deep Purple
          "750": "#3A309A", // Interstellar Purple
          "800": "#322985", // Deep Cosmic Purple
          "850": "#2A2470", // Cosmic Midnight Purple
          "900": "#221C5A", // Galactic Core Purple
          "950": "#191245", // Cosmic Void Purple
        },

        // Aurora Colors - Vivid Teals
        "aurora": {
          "100": "#D5F9FD", // Ultra Light Teal
          "200": "#9EEEF9", // Pale Teal
          "300": "#65E4F6", // Soft Teal
          "350": "#43DCF3", // Cosmic Mist Teal
          "400": "#2ED0EF", // Light Teal
          "450": "#1FC2E7", // Orbital Teal
          "500": "#18B5DE", // Medium Teal
          "550": "#16A7CA", // Supernova Teal
          "600": "#1394B5", // Vibrant Teal
          "650": "#1186A0", // Gravitational Teal
          "700": "#0F788B", // Deep Teal
          "750": "#0C6A76", // Interstellar Teal
          "800": "#0A5C66", // Deep Cosmic Teal
          "850": "#084751", // Cosmic Midnight Teal
          "900": "#06323B", // Galactic Core Teal
          "950": "#04252A", // Cosmic Void Teal
        },

        // Pulsar Colors - Vibrant Magentas
        "pulsar": {
          "100": "#FBE8FE", // Ultra Light Magenta
          "200": "#F5C6FD", // Pale Magenta
          "300": "#F09CFB", // Soft Magenta
          "350": "#E97FF9", // Cosmic Mist Magenta
          "400": "#E362F7", // Light Magenta
          "450": "#DA4CEF", // Orbital Magenta
          "500": "#D13DE6", // Medium Magenta
          "550": "#C434D3", // Supernova Magenta
          "600": "#B62CC0", // Vibrant Magenta
          "650": "#A426AD", // Gravitational Magenta
          "700": "#92209A", // Deep Magenta
          "750": "#801C87", // Interstellar Magenta
          "800": "#6E1874", // Deep Cosmic Magenta
          "850": "#5C1461", // Cosmic Midnight Magenta
          "900": "#4A104F", // Galactic Core Magenta
          "950": "#370A3A", // Cosmic Void Magenta
        },

        // Neutron Colors - Sophisticated Silvers
        "neutron": {
          "100": "#EDF0F6", // Ultra Light Silver
          "200": "#DCE2ED", // Pale Silver
          "300": "#CAD2E1", // Soft Silver
          "350": "#B8C2D5", // Cosmic Mist Silver
          "400": "#A7B3C9", // Light Silver
          "450": "#96A3BC", // Orbital Silver
          "500": "#8694B0", // Medium Silver
          "550": "#7683A1", // Supernova Silver
          "600": "#657192", // Vibrant Silver
          "650": "#576583", // Gravitational Silver
          "700": "#4B5775", // Deep Silver
          "750": "#414C68", // Interstellar Silver
          "800": "#39435B", // Deep Cosmic Silver
          "850": "#2E364C", // Cosmic Midnight Silver
          "900": "#242B3D", // Galactic Core Silver
          "950": "#1A1F2E", // Cosmic Void Silver
        },

        // Quasar Colors - Subtle Golds
        "quasar": {
          "100": "#FEECBD", // Ultra Light Gold
          "200": "#FDD083", // Pale Gold
          "300": "#FBB44A", // Soft Gold
          "400": "#F99B17", // Light Gold
          "500": "#D97F0C", // Medium Gold
          "600": "#B36A0A", // Vibrant Gold
          "700": "#8D5408", // Deep Gold
          "800": "#663D06", // Deep Cosmic Gold
          "900": "#402704", // Galactic Core Gold
          "950": "#2D1C04", // Cosmic Void Gold
        },

        // Nova Colors - Subtle Reds
        "nova": {
          "100": "#FEDBD7", // Ultra Light Red
          "200": "#FAB8AF", // Pale Red
          "300": "#F59183", // Soft Red
          "400": "#F06A5A", // Light Red
          "500": "#E64531", // Medium Red
          "600": "#CB2E1B", // Vibrant Red
          "700": "#A02415", // Deep Red
          "800": "#751A10", // Deep Cosmic Red
          "900": "#4A0F0A", // Galactic Core Red
          "950": "#330A06", // Cosmic Void Red
        },
      },
      backgroundImage: {
        // Cosmic Gradients
        "deep-space": "linear-gradient(to right, var(--color-space-950), var(--color-space-850))",
        "cosmic-nebula": "linear-gradient(to right, var(--color-space-900), var(--color-nebula-800), var(--color-pulsar-700))",
        "interstellar": "linear-gradient(to right, var(--color-space-900), var(--color-space-550))",
        "northern-lights": "linear-gradient(to right, var(--color-space-800), var(--color-aurora-700))",
        "galactic-core": "linear-gradient(to bottom, var(--color-space-950), var(--color-space-850), var(--color-nebula-900))",
        "quantum-field": "linear-gradient(to right, var(--color-nebula-800), var(--color-pulsar-800), var(--color-aurora-800))",
        "pulsar-beam": "linear-gradient(to right, var(--color-pulsar-600), var(--color-pulsar-400))",
        "neutron-metal": "linear-gradient(to right, var(--color-neutron-800), var(--color-neutron-600), var(--color-neutron-700))",
        "event-horizon": "radial-gradient(circle at center, var(--color-space-900) 0%, var(--color-space-950) 100%)",
        "cosmic-dust": "linear-gradient(to bottom right, var(--color-quasar-800), var(--color-space-900), var(--color-nebula-900))",
        "plasma-flow": "linear-gradient(to right, var(--color-aurora-700), var(--color-nebula-600), var(--color-pulsar-500))",
        "starlight": "linear-gradient(45deg, var(--color-neutron-300), var(--color-neutron-200), var(--color-neutron-400))",
      },
      boxShadow: {
        'cosmic': '0 4px 20px -2px rgba(26, 46, 108, 0.5)',
        'nebula': '0 4px 20px -2px rgba(83, 71, 218, 0.5)',
        'stellar': '0 0 25px rgba(47, 208, 239, 0.5)',
        'pulsar': '0 0 25px rgba(182, 44, 192, 0.5)',
        'quasar': '0 0 25px rgba(217, 127, 12, 0.3)',
        'neutron': '0 8px 16px -4px rgba(36, 43, 61, 0.3)',
        'cosmic-glow': '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)',
        'nebula-glow': '0 0 30px rgba(79, 70, 229, 0.5), 0 0 60px rgba(79, 70, 229, 0.2)',
        'pulsar-glow': '0 0 30px rgba(192, 38, 211, 0.5), 0 0 60px rgba(192, 38, 211, 0.2)',
        'aurora-glow': '0 0 30px rgba(14, 165, 233, 0.5), 0 0 60px rgba(14, 165, 233, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        title: ['Space Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'cosmic-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'space-float': 'float 6s ease-in-out infinite',
        'star-twinkle': 'twinkle 4s ease-in-out infinite',
        'nebula-shift': 'shift 10s ease-in-out infinite',
        'quantum-spin': 'spin 8s linear infinite',
        'aurora-wave': 'wave 8s ease-in-out infinite',
        'pulsar-beat': 'beat 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'comet-trail': 'trail 2.5s ease-in infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(0) translateY(-20px)' },
          '75%': { transform: 'translateX(-10px) translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-5px) scaleY(1.05)' },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
        trail: {
          '0%': { transform: 'translateX(-100%) translateY(0)', opacity: '0' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(100%) translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};