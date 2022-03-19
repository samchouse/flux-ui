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

export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.FC<CheckboxIconProps>;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      id,
      size,
      label,
      checked,
      disabled,
      indeterminate,
      defaultChecked,
      icon: Icon = CheckboxIcon,
      ...props
    }: CheckboxProps,
    ref
  ) => {
    const uuid = useUuid(id);
    const [selfChecked, setSelfChecked] = useState<CheckedState>(
      defaultChecked ?? false
    );

    useEffect(() => {
      setSelfChecked(
        indeterminate
          ? checked === true
            ? 'indeterminate'
            : false
          : checked ?? defaultChecked ?? false
      );
    }, [checked, defaultChecked, indeterminate]);

    const handleChange = useCallback(() => {
      if (disabled) return;
      if (indeterminate)
        return setSelfChecked(
          selfChecked === 'indeterminate' ? false : 'indeterminate'
        );
      setSelfChecked(typeof selfChecked === 'boolean' ? !selfChecked : false);
    }, [disabled, selfChecked, indeterminate]);

    return (
      <StyledWrapper size={size}>
        <StyledCheckbox
          id={uuid}
          ref={ref}
          disabled={disabled}
          checked={selfChecked}
          onCheckedChange={handleChange}
          defaultChecked={defaultChecked}
          {...props}
        >
          <StyledIndicator forceMount>
            {selfChecked !== false && (
              <Icon indeterminate={selfChecked === 'indeterminate'} />
            )}
          </StyledIndicator>
        </StyledCheckbox>
        <StyledLabel role="checkbox" htmlFor={uuid}>
          {label}
        </StyledLabel>
      </StyledWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';
