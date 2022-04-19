import { createReducer, on } from '@ngrx/store';
import {
  createCategory,
  createCategoryError,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryError,
  deleteCategorySuccess,
  getCategoriesByUserId,
  getCategoriesByUserIdError,
  getCategoriesByUserIdSuccess,
  getCategoryById,
  getCategoryByIdError,
  getCategoryByIdSuccess,
  updateCategory,
  updateCategoryError,
  updateCategorySuccess,
} from '../actions';
import { CategoryDTO } from '../models/category.dto';

export interface CategoryState {
  categories: CategoryDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
  finalized: boolean;
  create?: boolean;
  update?: boolean;
}

export const initialState: CategoryState = {
  categories: ([] = []),
  loading: false,
  loaded: false,
  error: null,
  finalized: false,
  create: false,
  update: false,
};

const _categoriesReducer = createReducer(
  initialState,

  on(createCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
  })),
  on(createCategorySuccess, (state, { category }) => ({
    ...state,
    loading: false,
    loaded: true,
    categories: [
      ...state.categories,
      new CategoryDTO(category.title, category.description, category.css_color),
    ],
    finalized: true,
    create: true,
    update: false,
  })),
  on(createCategoryError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(getCategoriesByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    finalized: false,
  })),
  on(getCategoriesByUserIdSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    loaded: true,
    categories: [...categories],
    finalized: true,
  })),
  on(getCategoriesByUserIdError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(getCategoryById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    create: false,
    update: false,
    finalized: false,
  })),
  on(getCategoryByIdSuccess, (state, { category }) => ({
    ...state,
    loading: false,
    loaded: true,
    categories: [category],
    create: false,
    update: false,
    finalized: true,
    error: null,
  })),
  on(getCategoryByIdError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(updateCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    create: false,
    update: true,
    error: null,
    finalized: false,
  })),
  on(updateCategorySuccess, (state, { category_id, category }) => ({
    ...state,
    loading: false,
    loaded: true,
    categories: [
      ...state.categories.map((categories) => {
        if (categories.categoryId === category_id) {
          return {
            ...categories,
            category,
          };
        } else {
          return categories;
        }
      }),
    ],
    create: false,
    update: true,
    finalized: true,
    error: null,
  })),
  on(updateCategoryError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(deleteCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    create: false,
    update: false,
    finalized: false,
    error: null,
  })),
  on(deleteCategorySuccess, (state, { category_id }) => ({
    ...state,
    loading: false,
    loaded: true,
    categories: [
      ...state.categories.filter(
        (category) => category.categoryId !== category_id
      ),
    ],
    finalized: true,
    create: false,
    update: false,
    error: null,
  })),
  on(deleteCategoryError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    finalized: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  }))
);

export function categoriesReducer(state: any, action: any) {
  return _categoriesReducer(state, action);
}
