import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';

import { Checkbox, CheckboxProps } from './checkbox';
import { CheckboxIcon } from './checkbox-icon';

const defaultProps = (controlled?: boolean): CheckboxProps => {
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

describe('@flux-ui/checkbox', () => {
  afterEach(cleanup);

  it('displays icon correctly', () => {
    const { rerender } = render(<CheckboxIcon />);
    expect(screen.getByTestId('checked-icon')).toBeTruthy();
    rerender(<CheckboxIcon indeterminate />);
    expect(screen.getByTestId('indeterminate-icon')).toBeTruthy();
  });

  it('sets checked state based on nothing', () => {
    render(<Checkbox label={defaultProps().label} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('sets checked state based on checked prop', () => {
    render(<Checkbox {...defaultProps(true)} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders label based on label prop', () => {
    const { container: withLabel } = render(<Checkbox {...defaultProps()} />);
    const { container: withoutLabel } = render(
      <Checkbox defaultChecked={defaultProps().defaultChecked} />
    );
    expect(withLabel.querySelectorAll('label')).toHaveLength(1);
    expect(withoutLabel.querySelectorAll('label')).toHaveLength(0);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('should handle indeterminate with defaultChecked prop', () => {
    const { rerender } = render(
      <Checkbox indeterminate {...defaultProps(true)} />
    );
    const el = screen.getByRole('checkbox');
    expect(el).toBePartiallyChecked();
    rerender(<Checkbox indeterminate {...defaultProps(false)} />);
    expect(el).not.toBePartiallyChecked();
  });

  it('should handle click with defaultChecked prop', () => {
    render(<Checkbox {...defaultProps()} />);
    const el = screen.getByRole('checkbox');
    expect(el).toBeChecked();
    el.click();
    expect(el).not.toBeChecked();
    el.click();
    expect(el).toBeChecked();
  });

  it('should handle click with indeterminate prop', () => {
    render(<Checkbox indeterminate {...defaultProps()} />);
    const el = screen.getByRole('checkbox');
    expect(el).toBePartiallyChecked();
    el.click();
    expect(el).not.toBePartiallyChecked();
    el.click();
    expect(el).toBePartiallyChecked();
  });

  it('should handle click with disabled prop', () => {
    render(<Checkbox disabled {...defaultProps()} />);
    const el = screen.getByRole('checkbox');
    expect(el).toBeDisabled();
    expect(el).toBeChecked();
    el.click();
    expect(el).toBeChecked();
  });
});
