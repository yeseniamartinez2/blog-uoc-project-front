import { createReducer, on } from '@ngrx/store';
import {
  registerUser,
  registerUserError,
  registerUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from '../actions';
import { UserDTO } from '../models/user.dto';

export interface UserState {
  user: UserDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
  finalized: boolean;
}

export const initialState: UserState = {
  user: [],
  loading: false,
  loaded: false,
  error: null,
  finalized: false,
};

const _userReducer = createReducer(
  initialState,
  on(registerUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(registerUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    finalized: true,
    user: [
      ...state.user,
      new UserDTO(
        user.name,
        user.surname_1,
        String(user.surname_2),
        user.alias,
        user.birth_date,
        user.email,
        user.password
      ),
    ],
  })),
  on(registerUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: [new UserDTO('', '', '', '', new Date(), '', '')],
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
    finalized: true,
  })),
  on(updateUser, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: [
      ...state.user,
      new UserDTO(
        user.name,
        user.surname_1,
        String(user.surname_2),
        user.alias,
        user.birth_date,
        user.email,
        user.password
      ),
    ],
  })),

  on(updateUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
    finalized: true,
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: [
      ...state.user.map((userAuth) => {
        if (userAuth.id === user.id && userAuth.password === user.password) {
          return {
            ...user,
            user,
          };
        } else {
          return user;
        }
      }),
    ],
    finalized: true,
  }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
