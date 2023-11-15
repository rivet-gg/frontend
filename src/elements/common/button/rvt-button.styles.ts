import { tv } from 'tailwind-variants';

export const button = tv({
	base: [
		'inline-flex',
		'gap-2',
		'm',
		'align-middle',
		'will-change-transform',
		'font-bold',
		'min-w-30',
		'transition-all',
		'ease-linear',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'aria-busy:cursor-wait',

		'relative',
		'before:absolute',
		'before:-bottom-1',
		'before:right-0',
		'before:left-0',
		'before:h-2',
		'before:bg-violet-600',
		'before:rounded-b-md',
		'before:-z-1',
		'before:-translate-z-1'
	],
	variants: {
		variant: {
			primary: 'bg-violet-500 text-white border-violet-400 shadow-violet-600',
			secondary: 'bg-zinc-700 text-white border-zinc-500 shadow-zinc-700'
		},
		size: {
			sm: 'px-2 py-1 text-xs rounded-md',
			md: 'px-4 py-2 text-sm rounded-md',
			lg: 'px-6 py-4 text-base rounded-md'
		},
		elevation: {
			none: [''],
			md: [
				// 'foldup-md',
				'border-b',
				'transform-gpu',
				// active
				// 'active:foldup-none',
				'active:translate-y-1',
				// hover
				// 'hover:foldup-lg',
				'hover:-translate-y-0.5',
				// disabled
				// 'disabled:foldup-none',
				// 'disabled:translate-y-0',
				// 'disabled:mt-1',
				// busy
				// 'aria-busy:foldup-none',
				'aria-busy:translate-y-0',
				'aria-busy:mt-1'
			]
		}
	},
	compoundVariants: [
		{
			variant: 'primary',
			elevation: 'md',
			className: ['disabled:border-violet-400']
		},
		{
			variant: 'primary',
			elevation: 'none',
			class: ['hover:bg-violet-400', 'disabled:bg-violet-500', 'aria-busy:bg-violet-500']
		}
	],
	defaultVariants: {
		variant: 'primary',
		size: 'md',
		elevation: 'none'
	}
});

export const icon = tv({
	variants: {
		size: { sm: 'h-2.5 w-2.5', md: 'h-5 w-5"', lg: 'h-6 w-6' }
	}
});

export type ButtonVariants = (typeof button)['variants'];

export type ButtonVariant = keyof ButtonVariants['variant'];
export type ButtonSize = keyof ButtonVariants['size'];
export type ButtonElevation = keyof ButtonVariants['elevation'];
