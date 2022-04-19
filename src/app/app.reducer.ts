import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects/auth.effects';
import * as authReducers from './auth/reducers';
import { CategoryEffects } from './categories/effects/categories.effects';
import * as categoryReducers from './categories/reducers';
import { PostsEffects } from './posts/effects/posts.effects';
import * as postsReducers from './posts/reducers';
import { UserEffects } from './users/effects/user.effect';
import * as userReducers from './users/reducers';

export interface AppState {
  authApp: authReducers.AuthState;
  userApp: userReducers.UserState;
  postApp: postsReducers.PostState;
  categoryApp: categoryReducers.CategoryState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authApp: authReducers.authReducer,
  userApp: userReducers.userReducer,
  postApp: postsReducers.postsReducer,
  categoryApp: categoryReducers.categoriesReducer,
};

export const EffectsArray: any[] = [
  UserEffects,
  AuthEffects,
  PostsEffects,
  CategoryEffects,
];
