import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} from '../categories.slice';

import { categoriesSaga } from '../categories.saga';

describe('Categories saga', () => {
  it('should fetch categories and dispatch success', () => {
    const mockCategoriesArray = [
      { title: 'mens', items: [] },
      { title: 'womens', items: [] },
    ];

    return expectSaga(categoriesSaga)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
      .dispatch(fetchCategoriesStart)
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .silentRun();
  });

  it('should not fetch categories on error and dispatch fail', () => {
    const mockError = new Error('An error occurred');

    return expectSaga(categoriesSaga)
      .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
      .dispatch(fetchCategoriesStart)
      .put(fetchCategoriesFail(mockError))
      .silentRun();
  });
});
