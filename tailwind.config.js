/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'dragon-dark': '#4c1d95',
  			'dragon-darker': '#3730a3',
  			'dragon-medium': '#7c3aed',
  			'dragon-light': '#a78bfa',
  			gold: '#fbbf24',
  			'gold-dark': '#f59e0b',
  			emerald: '#10b981',
  			'emerald-dark': '#059669',
  			fire: '#f97316',
  			'fire-dark': '#ea580c',
  			'light-bg': '#f8fafc',
  			'purple-bg': '#f3e8ff',
  			success: '#059669',
  			'success-bg': '#d1fae5',
  			error: '#dc2626',
  			'error-bg': '#fee2e2',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			comic: [
  				'Comic Sans MS',
  				'Arial',
  				'Helvetica',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'bounce-slow': 'bounce 2s infinite',
  			'pulse-slow': 'pulse 3s infinite'
  		},
  		boxShadow: {
  			'glow-gold': '0 0 20px rgba(251, 191, 36, 0.5)',
  			'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.5)',
  			'glow-fire': '0 0 20px rgba(249, 115, 22, 0.5)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}