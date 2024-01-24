import { tv } from 'tailwind-variants';

export const button = tv({
	base: [
		'inline-flex',
		'gap-2',
		'm',
		'items-center',
		'align-middle',
		'will-change-transform',
		'font-bold',
		'min-w-30',
		'transition-all',
		'duration-100',
		'disabled:opacity-60',
		'aria-busy:cursor-default',
		'group'
	],
	variants: {
		variant: {
			primary: 'text-cream-100 border-cream-100 border transition-all',
			secondary: ' text-white bg-charcole-900 border-cream-100 border transition-all',
			danger: 'border-red-500 text-red-500 border transition-all'
		},
		size: {
			sm: 'px-2 py-1 text-xs',
			md: 'px-4 py-2 text-sm',
			lg: 'px-6 py-4 text-base'
		}
	},
	compoundVariants: [
		{
			variant: 'primary',
			class: [
				// hover
				'hover:bg-cream-100 hover:text-charcole-950',
				// active
				'active:bg-cream-50',
				// disabled
				'disabled:border-cream-100 disabled:hover:bg-transparent disabled:hover:text-cream-100',
				// loading
				'aria-busy:border-neutral-300 aria-busy:hover:bg-transparent aria-busy:translate-y-0 aria-busy:hover:text-white'
			]
		},
		{
			variant: 'danger',
			class: [
				// hover
				'hover:bg-red-500/15',
				// active
				'hover:bg-red-500/20',
				// disabled
				'disabled:border-red-300 disabled:hover:bg-transparent disabled:translate-y-0 disabled:hover:text-red-500',
				// loading
				'aria-busy:border-red-300 aria-busy:hover:bg-transparent aria-busy:translate-y-0 aria-busy:hover:text-red-500'
			]
		},
		{
			variant: 'secondary',
			class: [
				// hover
				'hover:bg-charcole-800',
				// active
				'active:bg-charcole-700',
				// disabled
				'disabled:bg-charcole-900',
				// loading
				'aria-busy:bg-charcole-900'
			]
		}
	],
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
});

export const icon = tv({
	variants: {
		size: { sm: 'h-2.5 w-2.5', md: 'h-5 w-5"', lg: 'h-6 w-6' },
		variant: {
			primary: '',
			secondary: '',
			danger: ''
		}
	}
});

export type ButtonVariants = (typeof button)['variants'];

export type ButtonVariant = keyof ButtonVariants['variant'];
export type ButtonSize = keyof ButtonVariants['size'];
