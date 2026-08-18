import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js';
import { setCategories } from '../../store/categories/categories.actions.js';

import CategoriesPreview from '../categories-preview/categories-preview.component.jsx';
import Category from '../category/category.component.jsx';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();

      dispatch(setCategories(categoriesArray));
    };

    getCategories();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
