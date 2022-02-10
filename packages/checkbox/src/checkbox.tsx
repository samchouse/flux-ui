import { CheckIcon, MinusSmIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import { StyledCheckbox, StyledIndicator } from './checkbox.styles';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate,
  ...props
}: CheckboxProps) => {
  const [selfChecked, setSelfChecked] = useState<'indeterminate' | boolean>(
    checked ?? false
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  useEffect(() => {
    console.log(indeterminate, selfChecked, typeof selfChecked === 'boolean');
    setSelfChecked(
      selfChecked === true && indeterminate ? 'indeterminate' : checked ?? false
    );
    console.log(selfChecked);
  }, [indeterminate, selfChecked]);

  return (
    <StyledCheckbox
      checked={selfChecked}
      onCheckedChange={setSelfChecked}
      {...props}
    >
      <StyledIndicator>
        {selfChecked === true && <CheckIcon />}
        {selfChecked === 'indeterminate' && <MinusSmIcon />}
      </StyledIndicator>
    </StyledCheckbox>
  );
};
