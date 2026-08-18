import { Fragment } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/categories.selectors.js';

import ProductCard from '../../components/product-card/product-card.component.jsx';

import { CategoryTitle, CategoryContainer } from './category.styles.jsx';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const products = categoriesMap[category];

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
