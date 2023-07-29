import { useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';
import { type AriaButtonProps } from '@react-types/button';
import { forwardRef } from 'react';
import { type ClassValue, type VariantProps } from 'tailwind-variants';

import { button } from './button.styles';

export interface ButtonProps
  extends Omit<VariantProps<typeof button>, 'active'>,
    Pick<AriaButtonProps<'button'>, 'onBlur' | 'onFocus'>,
    Omit<
      React.ComponentPropsWithoutRef<'button'>,
      'onFocus' | 'onBlur' | 'color' | 'className'
    > {
  className: ClassValue;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }: ButtonProps, forwardedRef) => {
    const { disabled } = props;

    const ref = useObjectRef(forwardedRef);
    const { buttonProps, isPressed } = useButton(
      { ...props, children, isDisabled: disabled },
      ref
    );

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={button({
          ...props,
          active: isPressed
        })}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
