import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'rounded transition-all outline-none px-3 py-1 box-border border-2 hover:bg-transparent text-base font-semibold',
  variants: {
    color: {
      white: 'bg-gray-100 text-gray-950 border-gray-100 hover:text-gray-100',
      black: 'bg-gray-950 text-gray-100 border-gray-950 hover:text-gray-950'
    },
    active: {
      true: ''
    }
  },
  compoundVariants: [
    {
      color: 'white',
      active: true,
      class: 'bg-gray-100/10 hover:bg-gray-100/10'
    },
    {
      color: 'black',
      active: true,
      class: 'bg-gray-950/10 hover:bg-gray-950/10'
    }
  ],
  defaultVariants: {
    color: 'black'
  }
});
