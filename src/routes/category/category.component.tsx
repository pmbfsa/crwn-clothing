import { Fragment } from 'react';
import { useParams } from 'react-router';

import { useAppSelector } from '../../store/hooks';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selectors';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import type { CategoryParams } from './category.types';

import { CategoryTitle, CategoryContainer } from './category.styles';

const Category = () => {
  const { category } = useParams<CategoryParams>() as CategoryParams;
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);
  const products = categoriesMap[category];

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer data-testid="category">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
