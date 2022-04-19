import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
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
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategory),
      exhaustMap((category) =>
        this.categoryService.createCategory(category.category).pipe(
          map((categoryResponse) => {
            return createCategorySuccess({ category: categoryResponse });
          }),
          catchError((err) => {
            return of(createCategoryError({ payload: err }));
          })
        )
      )
    )
  );

  getCategoriesByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesByUserId),
      exhaustMap((params) =>
        this.categoryService.getCategoriesByUserId(params.user_id).pipe(
          map((categoryResponse) => {
            return getCategoriesByUserIdSuccess({
              categories: categoryResponse,
            });
          }),
          catchError((err) => {
            return of(getCategoriesByUserIdError({ payload: err }));
          })
        )
      )
    )
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoryById),
      exhaustMap((res) =>
        this.categoryService.getCategoryById(res.category_id).pipe(
          map((category) => {
            return getCategoryByIdSuccess({ category: category });
          }),
          catchError((err) => of(getCategoryByIdError({ payload: err })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      exhaustMap((res) =>
        this.categoryService.updateCategory(res.category_id, res.category).pipe(
          map((category) => {
            return updateCategorySuccess({
              category_id: category.categoryId,
              category: category,
            });
          }),
          catchError((err) => of(updateCategoryError({ payload: err })))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      exhaustMap((res) =>
        this.categoryService.deleteCategory(res.category_id).pipe(
          map(() => {
            return deleteCategorySuccess({ category_id: res.category_id });
          }),
          catchError((err) => of(deleteCategoryError({ payload: err })))
        )
      )
    )
  );
}
