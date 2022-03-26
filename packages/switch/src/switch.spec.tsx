import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';

import { Switch, SwitchProps } from './switch';

const defaultProps = (controlled?: boolean): SwitchProps => {
  const sharedProps = {
    label: 'test-label'
  };

  if (controlled !== undefined)
    return {
      ...sharedProps,
      checked: controlled
    };

  return {
    ...sharedProps,
    defaultChecked: true
  };
};

describe('@flux-ui/switch', () => {
  afterEach(cleanup);

  it('sets checked state based on nothing', () => {
    render(<Switch label={defaultProps().label} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('sets checked state based on checked prop', () => {
    render(<Switch {...defaultProps(true)} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('renders label based on label prop', () => {
    const { container: withLabel } = render(<Switch {...defaultProps()} />);
    const { container: withoutLabel } = render(
      <Switch defaultChecked={defaultProps().defaultChecked} />
    );
    expect(withLabel.querySelectorAll('label')).toHaveLength(1);
    expect(withoutLabel.querySelectorAll('label')).toHaveLength(0);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('should handle click with defaultChecked prop', () => {
    render(<Switch {...defaultProps()} />);
    const el = screen.getByRole('switch');
    expect(el).toBeChecked();
    el.click();
    expect(el).not.toBeChecked();
    el.click();
    expect(el).toBeChecked();
  });

  it('should handle click with disabled prop', () => {
    render(<Switch disabled {...defaultProps()} />);
    const el = screen.getByRole('switch');
    expect(el).toBeDisabled();
    expect(el).toBeChecked();
    el.click();
    expect(el).toBeChecked();
  });
});
