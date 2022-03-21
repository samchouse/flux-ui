import { CheckIcon, MinusIcon } from '@heroicons/react/solid';

export interface CheckboxIconProps
  extends React.ComponentPropsWithoutRef<'svg'> {
  indeterminate?: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  indeterminate,
  ...props
}: CheckboxIconProps) => {
  if (indeterminate)
    return <MinusIcon data-testid="indeterminate-icon" {...props} />;
  return <CheckIcon data-testid="checked-icon" {...props} />;
};
