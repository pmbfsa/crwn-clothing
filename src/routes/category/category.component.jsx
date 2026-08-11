import { Fragment, useContext } from 'react';
import { useParams } from 'react-router';

import CategoriesContext from '../../contexts/categories.context.jsx';

import ProductCard from '../../components/product-card/product-card.component.jsx';

import { CategoryTitle, CategoryContainer } from './category.styles.jsx';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const products = categoriesMap[category];

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
