import { useState } from 'react';
import ProductsContext from '../contexts/products.context.jsx';

import PRODUCTS from '../shop-data.json';

const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
