import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Spinner from '../spinner.component';

describe('Spinner component', () => {
  it('should render the spinner', () => {
    renderWithProviders(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
