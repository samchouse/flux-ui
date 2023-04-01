import { useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { button } from './button.styles';

export interface ButtonProps
  extends Omit<VariantProps<typeof button>, 'active'>,
    Omit<
      React.ComponentPropsWithoutRef<'button'>,
      'onFocus' | 'onBlur' | 'color'
    > {
  tmp: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }: ButtonProps, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);

    const { buttonProps, isPressed } = useButton({ ...props, children }, ref);

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={button({ ...props, className: '', active: isPressed })}
      >
        {children}
      </button>
    );
  }
);
