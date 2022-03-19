import { styled } from '@flux-ui/core';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';

export const StyledWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  variants: {
    size: {
      sm: {
        $$iconSize: '12px',
        $$fontSize: '15px',
        $$checkboxSize: '16px'
      },
      md: {
        $$iconSize: '14px',
        $$fontSize: '17px',
        $$checkboxSize: '18px'
      },
      lg: {
        $$iconSize: '16px',
        $$fontSize: '19px',
        $$checkboxSize: '20px'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  border: 'none',
  display: 'flex',
  cursor: 'pointer',
  background: '$info',
  alignItems: 'center',
  borderRadius: '$md',
  width: '$$checkboxSize',
  height: '$$checkboxSize',
  justifyContent: 'center',
  transition: 'all 250ms ease',
  '&:hover': {
    background: '$infoDark'
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        color: '$gray500',
        cursor: 'not-allowed',
        background: '$gray300',
        '&:hover': {
          background: '$gray300'
        }
      },
      false: {
        color: '$gray50'
      }
    },
    checked: {
      indeterminate: {},
      false: {
        boxSizing: 'border-box',
        background: 'transparent',
        border: '1px solid $gray300',
        '&:hover': {
          background: '$gray300'
        }
      }
    }
  }
});

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  all: 'unset',
  display: 'flex',
  width: '$$iconSize',
  height: '$$iconSize',
  '& svg': {
    width: '$full',
    height: '$full'
  }
});

export const StyledLabel = styled(LabelPrimitive.Root, {
  all: 'unset',
  lineHeight: 1,
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: '$$checkboxSize',
  paddingLeft: 'calc($$checkboxSize * 0.57)'
});
