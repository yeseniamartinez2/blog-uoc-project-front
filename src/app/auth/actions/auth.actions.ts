import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';

export const login = createAction(
  '[AUTH] Login user',
  props<{ user: AuthDTO }>()
);

export const loginSuccess = createAction(
  '[AUTH] Login user success',
  props<{
    user_id: string;
    access_token: string;
    email: string;
    password: string;
  }>()
);

export const loginError = createAction(
  '[AUTH] Login user error',
  props<{ payload: any }>()
);

export const logout = createAction('[AUTH] Logout user');
