import { styled } from '@flux-ui/core';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: '$info',
  width: 25,
  height: 25,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',
  borderWidth: 0
});

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$gray50',
  width: 15,
  height: 15
});
