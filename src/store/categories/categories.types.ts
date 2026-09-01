import type {
  Category,
  CategoryItem,
} from '../../routes/category/category.types';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export type CategoriesMap = {
  [key: string]: CategoryItem[];
};
