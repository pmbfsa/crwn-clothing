import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Directory from '../directory.component';

describe('Directory component', () => {
  it('should render', () => {
    renderWithProviders(<Directory />);

    const directoryElement = screen.getByTestId('directory');
    expect(directoryElement).toBeInTheDocument();
  });
});
