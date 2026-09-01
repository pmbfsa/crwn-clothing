import { all, takeLatest, call, put } from 'typed-redux-saga';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} from './categories.slice';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield* put(fetchCategoriesFail(error as Error));
  }
}

function* onFetchCategories() {
  yield* takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}

export default categoriesSaga;
