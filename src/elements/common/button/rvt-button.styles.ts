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
		'disabled:opacity-50',
		'aria-busy:cursor-default'
	],
	variants: {
		variant: {
			primary: 'bg-violet-500 text-white border-violet-400',
			secondary: 'bg-zinc-700 text-white border-zinc-600'
		},
		size: {
			sm: 'px-2 py-1 text-xs rounded-md',
			md: 'px-4 py-2 text-sm rounded-md',
			lg: 'px-6 py-4 text-base rounded-md'
		},
		elevation: {
			none: ['border', 'active:scale-98', 'disabled:scale-100', 'aria-busy:scale-100'],
			md: [
				'border-b',
				'mb-1',
				// bezel
				'transform-style-3d',
				'translate-z-1',
				'relative',
				'before:absolute',
				'before:-bottom-1',
				'before:inset-x-0',
				'before:h-2',
				'before:rounded-b-md',
				'before:-translate-z-1',
				'before:transition-transform',
				'before:will-change-transform',
				'before:duration-100',
				// active
				'active:translate-y-[3px]', // (translate-y-1 (0.25rem = 4px) - border-b (1px) = 3px)
				// active bezel
				'active:before:-translate-y-1',
				'active:before:-translate-z-px',
				// loading
				'aria-busy:translate-y-1',
				// loading bezel
				'aria-busy:before:-translate-y-1',
				'aria-busy:before:-translate-z-px',
				// disabled
				'disabled:translate-y-1',
				// disabled bezel
				'disabled:before:-translate-y-1',
				'disabled:before:-translate-z-px',
				'disabled:before:opacity-0'
			]
		}
	},
	compoundVariants: [
		{
			variant: 'primary',
			elevation: 'md',
			className: ['disabled:border-violet-400', 'before:bg-violet-600']
		},
		{
			variant: 'secondary',
			elevation: 'md',
			className: ['disabled:border-zinc-500', 'before:bg-zinc-750']
		},
		{
			variant: 'primary',
			elevation: 'none',
			class: [
				// hover
				'hover:bg-violet-450',
				// active
				'active:bg-violet-550',
				// disabled
				'disabled:bg-violet-550',
				// loading
				'aria-busy:bg-violet-550'
			]
		},
		{
			variant: 'secondary',
			elevation: 'none',
			class: [
				// hover
				'hover:bg-zinc-650',
				// active
				'active:bg-zinc-750',
				// disabled
				'disabled:bg-zinc-650',
				// loading
				'aria-busy:bg-zinc-650'
			]
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
