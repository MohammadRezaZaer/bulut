import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const brandColor = '#6E21FF';
const brandColorDark = '#748E63';
const secondaryColor = '#FFAF59';
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			primary: ['YekanBakhFaNum', ...defaultTheme.fontFamily.sans]
  		},
  		colors: {
  			brand: {
  				DEFAULT: brandColor,
  				secondary: secondaryColor,

  				dark: brandColorDark,

  			},
  			primary: {
  				'50': 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
  				'100': 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
  				'200': 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
  				'300': 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
  				'400': 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
  				'500': 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
  				'600': 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
  				'700': 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
  				'800': 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
  				'900': 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
  				'950': 'rgb(var(--tw-color-primary-950) / <alpha-value>)'
  			},
  			dark: '#222222'
  		},
  		keyframes: {
			"caret-blink": {
				'0%,70%,100%': { opacity: '1' },
				"20%,50%": { opacity: "0" },
			},
  			flicker: {

  				'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
  					opacity: '0.99',
  					filter: 'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))'
  				},
  				'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
  					opacity: '0.4',
  					filter: 'none'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-700px 0'
  				},
  				'100%': {
  					backgroundPosition: '700px 0'
  				}
  			}
  		},
  		animation: {
  			flicker: 'flicker 3s linear infinite',
  			shimmer: 'shimmer 1.3s linear infinite',
			"caret-blink": "caret-blink 1.25s ease-out infinite",

		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [ require("tailwindcss-animate")],
} satisfies Config;
