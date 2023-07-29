import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'rounded transition-all outline-none px-3 py-1 box-border border-2 text-base font-semibold',
  variants: {
    color: {
      white: 'bg-gray-100 text-gray-950 border-gray-100',
      black: 'bg-gray-950 text-gray-100 border-gray-950'
    },
    active: {
      true: ''
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'hover:bg-transparent'
    }
  },
  compoundVariants: [
    {
      color: 'white',
      active: true,
      disabled: false,
      class: 'bg-gray-100/10 hover:bg-gray-100/10'
    },
    {
      color: 'black',
      active: true,
      disabled: false,
      class: 'bg-gray-950/10 hover:bg-gray-950/10'
    },
    {
      color: 'white',
      disabled: false,
      class: 'hover:text-gray-100'
    },
    {
      color: 'black',
      disabled: false,
      class: 'hover:text-gray-950'
    }
  ],
  defaultVariants: {
    color: 'black'
  }
});
