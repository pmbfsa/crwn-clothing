import { Fragment, useContext } from 'react';
import { useParams } from 'react-router';

import CategoriesContext from '../../contexts/categories.context.jsx';

import ProductCard from '../../components/product-card/product-card.component.jsx';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const products = categoriesMap[category];

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
