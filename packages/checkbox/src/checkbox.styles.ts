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
    },
    radius: {
      sm: {
        $$radius: '$radii$sm'
      },
      md: {
        $$radius: '$radii$md'
      },
      lg: {
        $$radius: '$radii$lg'
      }
    },
    color: {
      blue: {
        $$normalColor: '$colors$blue500',
        $$darkColor: '$colors$blue600'
      },
      violet: {
        $$normalColor: '$colors$violet500',
        $$darkColor: '$colors$violet600'
      },
      pink: {
        $$normalColor: '$colors$pink500',
        $$darkColor: '$colors$pink600'
      },
      red: {
        $$normalColor: '$colors$red500',
        $$darkColor: '$colors$red600'
      },
      purple: {
        $$normalColor: '$colors$purple500',
        $$darkColor: '$colors$purple600'
      },
      indigo: {
        $$normalColor: '$colors$indigo500',
        $$darkColor: '$colors$indigo600'
      },
      cyan: {
        $$normalColor: '$colors$cyan500',
        $$darkColor: '$colors$cyan600'
      },
      teal: {
        $$normalColor: '$colors$teal500',
        $$darkColor: '$colors$teal600'
      },
      green: {
        $$normalColor: '$colors$green500',
        $$darkColor: '$colors$green600'
      },
      lime: {
        $$normalColor: '$colors$lime500',
        $$darkColor: '$colors$lime600'
      },
      yellow: {
        $$normalColor: '$colors$yellow500',
        $$darkColor: '$colors$yellow600'
      },
      orange: {
        $$normalColor: '$colors$orange500',
        $$darkColor: '$colors$orange600'
      },
      black: {
        $$normalColor: '$colors$gray800',
        $$darkColor: '$colors$gray900'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
    color: 'black'
  }
});

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  border: 'none',
  display: 'flex',
  color: '$gray50',
  cursor: 'pointer',
  alignItems: 'center',
  width: '$$checkboxSize',
  height: '$$checkboxSize',
  borderRadius: '$$radius',
  justifyContent: 'center',
  background: '$$normalColor',
  transition: 'all 250ms ease',
  '&:hover': {
    background: '$$darkColor'
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
  color: 'inherit',
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
