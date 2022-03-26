import { styled } from '@flux-ui/core';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SwitchPrimitive from '@radix-ui/react-switch';

export const StyledWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  variants: {
    size: {
      sm: {
        $$height: '16px',
        $$width: '28px',
        $$thumbSize: '10px',
        $$translateX: '3px',
        $$translateXChecked: '15px',
        $$translateXBordered: '1px'
      },
      md: {
        $$height: '20px',
        $$width: '36px',
        $$thumbSize: '14px',
        $$translateX: '3px',
        $$translateXChecked: '19px',
        $$translateXBordered: '1.5px'
      },
      lg: {
        $$height: '24px',
        $$width: '44px',
        $$thumbSize: '16px',
        $$translateX: '4px',
        $$translateXChecked: '24px',
        $$translateXBordered: '2px'
      }
    },
    radius: {
      sm: {
        $$radius: '$radii$sm'
      },
      md: {
        $$radius: '$radii$default'
      },
      lg: {
        $$radius: '$radii$full'
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
    radius: 'lg',
    color: 'blue'
  }
});

export const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  cursor: 'pointer',
  height: '$$height',
  width: '$$width',
  background: '$$normalColor',
  borderRadius: '$$radius',
  position: 'relative',
  transition: 'all 250ms ease',
  '&:hover': {
    background: '$$darkColor'
  },
  variants: {
    bordered: {
      true: {
        '&[data-disabled=""]': {
          opacity: 0.8,
          cursor: 'not-allowed'
        },
        '&[data-state="unchecked"]': {
          boxSizing: 'border-box',
          background: 'transparent',
          border: '2px solid $gray300',
          '&:hover': {
            border: '2px solid $$normalColor'
          }
        }
      },
      false: {
        '&[data-disabled=""]': {
          opacity: 0.8,
          cursor: 'not-allowed',
          background: '$gray300'
        },
        '&[data-state="unchecked"]': {
          background: '$gray300'
        }
      }
    }
  }
});

export const StyledThumb = styled(SwitchPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: '$$thumbSize',
  height: '$$thumbSize',
  background: '$gray50',
  borderRadius: '$$radius',
  transition: 'all 250ms ease',
  transform: 'translateX($$translateXBordered)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX($$translateXChecked)'
  },
  variants: {
    bordered: {
      true: {
        '&[data-state="unchecked"]': {
          background: '$gray900'
        }
      },
      false: {
        transform: 'translateX($$translateX)'
      }
    }
  }
});

export const StyledLabel = styled(LabelPrimitive.Root, {
  all: 'unset',
  lineHeight: 1,
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: '$$height',
  pl: 'calc($$height * 0.57)'
});
