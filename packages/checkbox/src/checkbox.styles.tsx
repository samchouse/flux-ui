import { styled } from '@flux-ui/core';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  length: 0,
  all: 'unset',
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 250ms ease',
  background: '$info',
  '&:hover': {
    background: '$infoDark'
  },
  variants: {
    checked: {
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
  length: 0,
  width: 16,
  height: 16,
  display: 'flex',
  color: '$gray50'
});
