import { forwardRef, useCallback, useEffect, useState } from 'react';

import { DefaultColors, DefaultRadii, DefaultSizes } from '@flux-ui/core';
import { useId } from '@flux-ui/hooks';

import {
  StyledLabel,
  StyledSwitch,
  StyledThumb,
  StyledWrapper
} from './switch.styles';

interface CheckboxWrapperProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'css'> {
  color: DefaultColors;
}

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'type' | 'size' | 'css' | 'onChange'
  > {
  checked?: boolean;
  bordered?: boolean;
  size?: DefaultSizes;
  radius?: DefaultRadii;
  color?: DefaultColors;
  label?: React.ReactNode;
  defaultChecked?: boolean;
  wrapperProps?: CheckboxWrapperProps;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      id,
      size,
      label,
      color,
      radius,
      checked,
      disabled,
      bordered,
      wrapperProps,
      defaultChecked,
      ...props
    }: SwitchProps,
    ref
  ) => {
    const componentId = useId(id);
    const [selfChecked, setSelfChecked] = useState(defaultChecked ?? false);

    useEffect(
      () => setSelfChecked(defaultChecked ?? checked ?? false),
      [checked, defaultChecked]
    );

    const handleChange = useCallback(
      () => setSelfChecked(!selfChecked),
      [selfChecked]
    );

    return (
      <StyledWrapper
        size={size}
        color={color}
        radius={radius}
        {...wrapperProps}
      >
        <StyledSwitch
          ref={ref}
          id={componentId}
          bordered={bordered}
          disabled={disabled}
          checked={selfChecked}
          onCheckedChange={handleChange}
          defaultChecked={defaultChecked}
          aria-labelledby={`${componentId}-label`}
          {...props}
        >
          <StyledThumb bordered={bordered} />
        </StyledSwitch>
        {label && (
          <StyledLabel
            as="label"
            htmlFor={componentId}
            id={`${componentId}-label`}
          >
            {label}
          </StyledLabel>
        )}
      </StyledWrapper>
    );
  }
);

Switch.displayName = 'Switch';
