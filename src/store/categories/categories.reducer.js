import CATEGORIES_ACTION_TYPES from './categories.types';

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload, error: null };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return { ...state, isLoading: false, categories: [], error: payload };
    default:
      return state;
  }
};

export default categoriesReducer;
