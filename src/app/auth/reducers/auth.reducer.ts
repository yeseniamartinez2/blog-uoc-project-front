import { createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess, logout } from '../actions';
import { AuthDTO } from '../models/auth.dto';

export interface AuthState {
  user: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
  finalized: boolean;
}

export const initialState: AuthState = {
  user: new AuthDTO('', '', '', ''),
  loading: false,
  loaded: false,
  error: null,
  finalized: false,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    user: new AuthDTO('', '', '', ''),
  })),
  on(loginSuccess, (state, { user_id, access_token, email, password }) => ({
    ...state,
    user: new AuthDTO(user_id, access_token, email, password),
    loading: false,
    loaded: true,
    finalized: true,
  })),
  on(loginError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: new AuthDTO('', '', '', ''),
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
    finalized: true,
  })),
  on(logout, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    user: new AuthDTO('', '', '', ''),
  }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
