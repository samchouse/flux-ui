import { CheckIcon, MinusIcon } from '@heroicons/react/solid';
import React from 'react';

export interface CheckboxIconProps {
  indeterminate: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  indeterminate
}: CheckboxIconProps) => {
  if (indeterminate) return <MinusIcon />;
  return <CheckIcon />;
};
