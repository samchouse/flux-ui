import { CheckIcon, MinusIcon } from '@heroicons/react/solid';
import * as AccessibleIconPrimitive from '@radix-ui/react-accessible-icon';

export interface CheckboxIconProps
  extends React.ComponentPropsWithoutRef<'svg'> {
  indeterminate?: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  indeterminate,
  ...props
}: CheckboxIconProps) => {
  if (indeterminate)
    return (
      <AccessibleIconPrimitive.Root label="Indeterminate icon">
        <MinusIcon data-testid="indeterminate-icon" {...props} />
      </AccessibleIconPrimitive.Root>
    );

  return (
    <AccessibleIconPrimitive.Root label="Checked icon">
      <CheckIcon data-testid="checked-icon" {...props} />
    </AccessibleIconPrimitive.Root>
  );
};
