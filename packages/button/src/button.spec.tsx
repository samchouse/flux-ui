import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Button, ButtonProps } from './button';

describe.concurrent('@flux-ui/button', () => {
  afterEach(cleanup);

  it('should render successfully', async () => {
    const props: ButtonProps = {
      children: 'Test',
      tmp: 'test'
    };

    render(<Button {...props} />);

    expect(screen.getByText(props.children?.toString() ?? '')).toBeTruthy();
  });
});
