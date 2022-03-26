import { DefaultColors, DefaultRadii, DefaultSizes } from '@flux-ui/core';
import { useUuid } from '@flux-ui/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

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
      wrapperProps,
      defaultChecked,
      ...props
    }: SwitchProps,
    ref
  ) => {
    const uuid = useUuid(id);
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
          id={uuid}
          ref={ref}
          disabled={disabled}
          checked={selfChecked}
          onCheckedChange={handleChange}
          defaultChecked={defaultChecked}
          aria-labelledby={`${uuid}-label`}
          {...props}
        >
          <StyledThumb />
        </StyledSwitch>
        {label && (
          <StyledLabel as="label" htmlFor={uuid} id={`${uuid}-label`}>
            {label}
          </StyledLabel>
        )}
      </StyledWrapper>
    );
  }
);

Switch.displayName = 'Switch';
