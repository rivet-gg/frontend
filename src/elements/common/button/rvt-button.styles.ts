import { tv } from 'tailwind-variants';

export const button = tv({
	base: [
		'inline-flex',
		'gap-2',
		'm',
		'align-center',
		'align-middle',
		'will-change-transform',
		'font-bold',
		'min-w-30',
		'transition-all',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'aria-busy:cursor-wait'
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
			none: [''],
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
			className: ['disabled:border-zinc-500', 'before:bg-zinc-900']
		},
		{
			variant: 'primary',
			elevation: 'none',
			class: [
				// hover
				'hover:bg-violet-400',
				// active
				'active:bg-violet-600',
				'active:scale-95',
				// disabled
				'disabled:bg-violet-500',
				'disabled:scale-100',
				// loading
				'aria-busy:bg-violet-500',
				'aria-busy:scale-100'
			]
		},
		{
			variant: 'secondary',
			elevation: 'none',
			class: [
				// hover
				'hover:bg-zinc-600',
				// active
				'active:bg-zinc-700',
				'active:scale-95',
				// disabled
				'disabled:bg-zinc-600',
				'disabled:scale-100',
				// loading
				'aria-busy:bg-zinc-600',
				'aria-busy:scale-100'
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
