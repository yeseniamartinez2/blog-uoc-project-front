import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';

export const registerUser = createAction(
  '[USER] Register user',
  props<{ user: UserDTO }>()
);

export const registerUserSuccess = createAction(
  '[USER] Register user success',
  props<{ user: UserDTO }>()
);

export const registerUserError = createAction(
  '[USER] Register user error',
  props<{ payload: any }>()
);

export const updateUser = createAction(
  '[USER] Update user',
  props<{ user_id: string; user: UserDTO }>()
);

export const updateUserSuccess = createAction(
  '[USER] Update user success',
  props<{ user: UserDTO }>()
);

export const updateUserError = createAction(
  '[USER] Update user error',
  props<{ payload: any }>()
);
