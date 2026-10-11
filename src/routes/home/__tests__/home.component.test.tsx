import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Home from '../home.component';

describe('Home component', () => {
  it('should render Directory', () => {
    renderWithProviders(<Home />);

    const directoryElement = screen.getByTestId('directory');
    expect(directoryElement).toBeInTheDocument();
  });
});
