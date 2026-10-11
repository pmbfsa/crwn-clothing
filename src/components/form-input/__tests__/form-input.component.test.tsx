import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/test/test.utils';

import FormInput from '../form-input.component';

const labelStyle = {
  normal: {
    top: '10px',
    'font-size': '16px',
  },
  shrink: {
    top: '-14px',
    'font-size': '12px',
  },
};

describe('FormInput component', () => {
  it('should render', () => {
    renderWithProviders(<FormInput label="Name" />);

    const inputFormElement = screen.getByRole('textbox');
    expect(inputFormElement).toBeInTheDocument();
  });

  it('should shrink label when input has a value', () => {
    renderWithProviders(
      <FormInput label="Name" value="Teste" onChange={() => {}} />,
    );

    const labelElement = screen.getByText(/Name/i);
    expect(labelElement).toHaveStyle(labelStyle.shrink);
  });

  it('should not shrink label when input is empty', () => {
    renderWithProviders(<FormInput label="Name" onChange={() => {}} />);

    const labelElement = screen.getByText(/Name/i);
    expect(labelElement).toHaveStyle(labelStyle.normal);
  });

  it('should shrink label when input is empty and has focus', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FormInput label="Name" onChange={() => {}} />);

    const inputFormElement = screen.getByRole('textbox');
    await user.click(inputFormElement);

    const labelElement = screen.getByText(/Name/i);
    expect(labelElement).toHaveStyle(labelStyle.shrink);
  });

  it('should focus the input on tab and lose focus on tab away', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FormInput label="Name" />);

    const inputFormElement = screen.getByRole('textbox');

    await user.tab();
    expect(inputFormElement).toHaveFocus();

    await user.tab();
    expect(inputFormElement).not.toHaveFocus();
  });
});
