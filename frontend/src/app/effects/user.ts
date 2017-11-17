import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Config } from '../config';
import * as user from '../actions/user';
import * as notification from '../actions/notification';
import * as routerActions from '../actions/router';
import { UserService } from '../services/user';
import { ICredentials } from '../models';
import { startWith, switchMap, map, tap, mergeMap, merge } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$: Observable<Action> = this.actions$.ofType(user.ActionTypes.LOAD_CURRENT).pipe(
    startWith(new user.LoadCurrentAction()),
    switchMap(() =>
      of(localStorage.getItem(Config.localStorageKeyUser)).pipe(
        map((token: string) => {
          if (!token) {
            return new user.LoadCurrentFailedAction();
          }

          const tokenArray = token.split('.');
          const payload = JSON.parse(atob(tokenArray[1]));

          return new user.LoadCurrentSuccessAction({ email: payload.email, token });
        }),
      ),
    ),
  );

  @Effect()
  login$: Observable<Action> = this.actions$.ofType<user.LoginAction>(user.ActionTypes.LOGIN).pipe(
    map(action => action.payload),
    switchMap((credentials: ICredentials) =>
      this.userService.login(credentials).pipe(
        tap(loggedInUser => {
          localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token);
        }),
        mergeMap(loggedInUser =>
          of(new user.LoginSuccessAction(loggedInUser)).pipe(
            merge(of(new routerActions.Go({ path: [''] }))),
          ),
        ),
        catchError(() => of(new user.LoginFailedAction())),
      ),
    ),
  );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType<user.RegistrationAction>(user.ActionTypes.REGISTRATION)
    .pipe(
      map(action => action.payload),
      switchMap((credentials: ICredentials) =>
        this.userService.register(credentials).pipe(
          tap(loggedInUser => {
            localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token);
          }),
          mergeMap(loggedInUser =>
            of(new user.RegistrationSuccessAction(loggedInUser)).pipe(
              merge(of(new routerActions.Go({ path: [''] }))),
            ),
          ),
          catchError(() => of(new user.RegistrationFailedAction())),
        ),
      ),
    );

  @Effect()
  showErrorOnLoginFailed$ = this.actions$
    .ofType(user.ActionTypes.LOGIN_FAILED)
    .pipe(map(() => new notification.ShowErrorAction({ message: `Could not login` })));

  @Effect()
  showErrorOnRegisterFailed$ = this.actions$
    .ofType(user.ActionTypes.REGISTRATION_FAILED)
    .pipe(map(() => new notification.ShowErrorAction({ message: `Could not register` })));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGOUT)
    .pipe(
      tap(() => localStorage.removeItem(Config.localStorageKeyUser)),
      map(() => new user.LogoutSuccessAction()),
    );

  constructor(private actions$: Actions, private userService: UserService) {}
}
