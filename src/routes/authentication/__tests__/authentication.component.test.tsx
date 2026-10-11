import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Authentication from '../authentication.component';

describe('Authentication component', () => {
  it('should render', () => {
    renderWithProviders(<Authentication />);

    const authenticationElement = screen.getByTestId('authentication');
    expect(authenticationElement).toBeInTheDocument();
  });
});
