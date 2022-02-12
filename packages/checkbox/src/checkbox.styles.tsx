import { styled } from '@flux-ui/core';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  width: 20,
  height: 20,
  border: 'none',
  display: 'flex',
  cursor: 'pointer',
  borderRadius: '$md',
  background: '$info',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms ease',
  '&:hover': {
    background: '$infoDark'
  },
  variants: {
    checked: {
      indeterminate: {},
      false: {
        boxSizing: 'border-box',
        background: 'transparent',
        border: '2px solid $gray400',
        '&:hover': {
          background: '$gray400'
        }
      }
    }
  }
});

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  width: 16,
  height: 16,
  display: 'flex',
  color: '$gray50',
  '& svg': {
    width: '$full',
    height: '$full'
  }
});
