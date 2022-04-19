import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  registerUser,
  registerUserError,
  registerUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from '../actions';
import { UserDTO } from '../models/user.dto';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((userProfile) =>
        this.userService.register(userProfile.user).pipe(
          map((auth) => {
            console.log(auth);
            return registerUserSuccess({
              user: new UserDTO(
                auth.name,
                auth.surname_1,
                String(auth.surname_2),
                auth.alias,
                auth.birth_date,
                auth.email,
                auth.password
              ),
            });
          }),
          catchError((err) => of(registerUserError({ payload: err })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((userProfile) =>
        this.userService.updateUser(userProfile.user_id, userProfile.user).pipe(
          map((auth) => updateUserSuccess({ user: auth })),
          catchError((err) => of(updateUserError({ payload: err })))
        )
      )
    )
  );
}
