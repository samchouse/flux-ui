import { CheckIcon, MinusSmIcon } from '@heroicons/react/outline';
import React, { useCallback, useEffect, useState } from 'react';

import { StyledCheckbox, StyledIndicator } from './checkbox.styles';

type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate,
  defaultChecked,
  ...props
}: CheckboxProps) => {
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
    if (indeterminate)
      return setSelfChecked(
        selfChecked === 'indeterminate' ? false : 'indeterminate'
      );
    setSelfChecked(typeof selfChecked === 'boolean' ? !selfChecked : false);
  }, [selfChecked, indeterminate]);

  return (
    <StyledCheckbox
      checked={selfChecked}
      onCheckedChange={handleChange}
      defaultChecked={defaultChecked}
      {...props}
    >
      <StyledIndicator>
        {selfChecked === true && <CheckIcon />}
        {selfChecked === 'indeterminate' && <MinusSmIcon />}
      </StyledIndicator>
    </StyledCheckbox>
  );
};
