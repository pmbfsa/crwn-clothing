import { Routes, Route } from 'react-router';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import DirectoryItem from '../directory-item.component';
import Category from '../../../routes/category/category.component';

const mockDirectoryItem = {
  id: 1,
  title: 'Directory A',
  imageUrl: 'URL A',
  route: 'shop/directoryA',
};

const mockRoute = (
  <Routes>
    <Route
      index
      element={
        <DirectoryItem
          key={mockDirectoryItem.id}
          directory={mockDirectoryItem}
        />
      }
    />
    <Route path={mockDirectoryItem.route} element={<Category />} />
  </Routes>
);

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useParams: () => ({
      category: 'directoryA',
    }),
  };
});

describe('DirectoryItem component', () => {
  it('should render directory item', () => {
    renderWithProviders(mockRoute);

    const directoryItemElement = screen.getByText(/Directory A/i);
    expect(directoryItemElement).toBeInTheDocument();
  });

  it('should render Category when clicked', () => {
    renderWithProviders(mockRoute);

    const directoryItemElement = screen.getByTestId('directory-item');
    fireEvent.click(directoryItemElement);

    const categoryElement = screen.getByTestId('category');
    expect(categoryElement).toBeInTheDocument();
  });
});
