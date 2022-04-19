import { createAction, props } from '@ngrx/store';
import { CategoryDTO } from '../models/category.dto';

export const createCategory = createAction(
  '[CATEGORY] Create category',
  props<{ category: CategoryDTO }>()
);

export const createCategorySuccess = createAction(
  '[CATEGORY] Create category success',
  props<{ category: CategoryDTO }>()
);

export const createCategoryError = createAction(
  '[CATEGORY] Create category error',
  props<{ payload: any }>()
);

export const getCategoriesByUserId = createAction(
  '[CATEGORY] Get categories by user id',
  props<{ user_id: string }>()
);

export const getCategoriesByUserIdSuccess = createAction(
  '[CATEGORY] Get categories by user id success',
  props<{ categories: CategoryDTO[] }>()
);

export const getCategoriesByUserIdError = createAction(
  '[CATEGORY] Get categories by user id error',
  props<{ payload: any }>()
);
export const getCategoryById = createAction(
  '[CATEGORY] Get category by id',
  props<{ category_id: string }>()
);

export const getCategoryByIdSuccess = createAction(
  '[CATEGORY] Get category by id success',
  props<{ category: CategoryDTO }>()
);

export const getCategoryByIdError = createAction(
  '[CATEGORY] Get category by id error',
  props<{ payload: any }>()
);

export const updateCategory = createAction(
  '[CATEGORY] Update category',
  props<{ category_id: string; category: CategoryDTO }>()
);

export const updateCategorySuccess = createAction(
  '[CATEGORY] Update category success',
  props<{ category_id: string; category: CategoryDTO }>()
);

export const updateCategoryError = createAction(
  '[CATEGORY] Update category error',
  props<{ payload: any }>()
);

export const deleteCategory = createAction(
  '[CATEGORY] Delete category',
  props<{ category_id: string }>()
);

export const deleteCategorySuccess = createAction(
  '[CATEGORY] Delete category success',
  props<{ category_id: string }>()
);

export const deleteCategoryError = createAction(
  '[CATEGORY] Delete category error',
  props<{ payload: any }>()
);
