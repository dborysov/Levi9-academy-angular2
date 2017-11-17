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

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOAD_CURRENT)
    .startWith(new user.LoadCurrentAction())
    .switchMap(() =>
      Observable.of(localStorage.getItem(Config.localStorageKeyUser)).map((token: string) => {
        if (!token) {
          return new user.LoadCurrentFailedAction();
        }

        const tokenArray = token.split('.');
        const payload = JSON.parse(atob(tokenArray[1]));

        return new user.LoadCurrentSuccessAction({ email: payload.email, token });
      }),
    );

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<user.LoginAction>(user.ActionTypes.LOGIN)
    .map(action => action.payload)
    .switchMap((credentials: ICredentials) =>
      this.userService
        .login(credentials)
        .do(loggedInUser => {
          localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token);
        })
        .mergeMap(loggedInUser =>
          Observable.of(new user.LoginSuccessAction(loggedInUser)).merge(
            Observable.of(new routerActions.Go({ path: [''] })),
          ),
        )
        .catch(() => Observable.of(new user.LoginFailedAction())),
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType<user.RegistrationAction>(user.ActionTypes.REGISTRATION)
    .map(action => action.payload)
    .switchMap((credentials: ICredentials) =>
      this.userService
        .register(credentials)
        .do(loggedInUser => {
          localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token);
        })
        .mergeMap(loggedInUser =>
          Observable.of(new user.RegistrationSuccessAction(loggedInUser)).merge(
            Observable.of(new routerActions.Go({ path: [''] })),
          ),
        )
        .catch(() => Observable.of(new user.RegistrationFailedAction())),
    );

  @Effect()
  showErrorOnLoginFailed$ = this.actions$
    .ofType(user.ActionTypes.LOGIN_FAILED)
    .map(() => new notification.ShowErrorAction({ message: `Could not login` }));

  @Effect()
  showErrorOnRegisterFailed$ = this.actions$
    .ofType(user.ActionTypes.REGISTRATION_FAILED)
    .map(() => new notification.ShowErrorAction({ message: `Could not register` }));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGOUT)
    .do(() => localStorage.removeItem(Config.localStorageKeyUser))
    .map(() => new user.LogoutSuccessAction());

  constructor(private actions$: Actions, private userService: UserService) {}
}
