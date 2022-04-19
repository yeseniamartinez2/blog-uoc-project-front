import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginError, loginSuccess } from '../actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}
  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((userAuth) =>
        this.authService.login(userAuth.user).pipe(
          map((auth) =>
            loginSuccess({
              user_id: auth.user_id,
              access_token: auth.access_token,
              email: userAuth.user.email,
              password: userAuth.user.password,
            })
          ),
          catchError((e) => of(loginError({ payload: e })))
        )
      )
    )
  );
}
