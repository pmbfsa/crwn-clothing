import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import Button from '../button.component.tsx';

import BUTTON_TYPE_CLASS from '../button-type-class.tsx';

describe('Button component', () => {
  it('should render base button when nothing is passed', () => {
    render(<Button />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('background-color: rgb(0, 0, 0)');
  });

  it('should render google button when passed google button type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASS.google} />);

    const googleButtonElement = screen.getByRole('button');
    expect(googleButtonElement).toHaveStyle(
      'background-color: rgb(66, 133, 244)',
    );
  });

  it('should render inverted button when passed inverted button type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASS.inverted} />);

    const invertedButtonElement = screen.getByRole('button');
    expect(invertedButtonElement).toHaveStyle(
      'background-color: rgb(255, 255, 255)',
    );
  });

  it('should be enabled if isLoading is false', () => {
    render(<Button isLoading={false} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeEnabled();

    const spinnerElement = screen.queryByTestId('button-spinner');
    expect(spinnerElement).toBeNull();
  });

  it('should be disabled and render spinner if isLoading is true', () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();

    const spinnerElement = screen.getByTestId('button-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
