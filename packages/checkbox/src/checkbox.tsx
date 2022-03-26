import { DefaultColors, DefaultRadii, DefaultSizes } from '@flux-ui/core';
import { useUuid } from '@flux-ui/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { CheckboxIcon, CheckboxIconProps } from './checkbox-icon';
import {
  StyledCheckbox,
  StyledIndicator,
  StyledLabel,
  StyledWrapper
} from './checkbox.styles';

export type CheckedState = boolean | 'indeterminate';

interface CheckboxWrapperProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'css'> {
  color: DefaultColors;
}

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'type' | 'size' | 'css' | 'onChange'
  > {
  checked?: boolean;
  size?: DefaultSizes;
  color?: DefaultColors;
  radius?: DefaultRadii;
  label?: React.ReactNode;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  icon?: React.FC<CheckboxIconProps>;
  wrapperProps?: CheckboxWrapperProps;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
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
      indeterminate,
      defaultChecked,
      icon: Icon = CheckboxIcon,
      ...props
    }: CheckboxProps,
    ref
  ) => {
    const uuid = useUuid(id);
    const [selfChecked, setSelfChecked] = useState<CheckedState>(
      indeterminate
        ? defaultChecked
          ? 'indeterminate'
          : false
        : defaultChecked ?? false
    );

    useEffect(() => {
      if (defaultChecked)
        return setSelfChecked(indeterminate ? 'indeterminate' : defaultChecked);

      setSelfChecked(
        indeterminate ? (checked ? 'indeterminate' : false) : checked ?? false
      );
    }, [checked, defaultChecked, indeterminate]);

    const handleChange = useCallback(() => {
      if (indeterminate)
        return setSelfChecked(
          selfChecked === 'indeterminate' ? false : 'indeterminate'
        );
      setSelfChecked(!selfChecked);
    }, [selfChecked, indeterminate]);

    return (
      <StyledWrapper
        size={size}
        color={color}
        radius={radius}
        {...wrapperProps}
      >
        <StyledCheckbox
          id={uuid}
          ref={ref}
          disabled={disabled}
          checked={selfChecked}
          onCheckedChange={handleChange}
          defaultChecked={defaultChecked}
          aria-labelledby={`${uuid}-label`}
          {...props}
        >
          <StyledIndicator forceMount>
            {selfChecked !== false && (
              <Icon indeterminate={selfChecked === 'indeterminate'} />
            )}
          </StyledIndicator>
        </StyledCheckbox>
        {label && (
          <StyledLabel as="label" htmlFor={uuid} id={`${uuid}-label`}>
            {label}
          </StyledLabel>
        )}
      </StyledWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';
