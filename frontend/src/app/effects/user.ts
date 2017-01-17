import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { go } from '@ngrx/router-store';

import { Config } from '../config';
import * as user from '../actions/user';

import { IUserService } from '../services/user';

import { ICredentials } from '../models/credentials';

@Injectable()
export class UserEffects {
    @Effect()
    loadUser$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.LOAD_CURRENT)
        .startWith(new user.LoadCurrentAction())
        .switchMap(() => Observable.of(localStorage.getItem(Config.localStorageKeyUser))
            .map((token: string) => {
                if (!token) {
                    return new user.LoadCurrentFailedAction();
                }

                const tokenArray = token.split('.');
                const payload = JSON.parse(atob(tokenArray[1]));

                return new user.LoadCurrentSuccessAction({ email: payload.email, token });
            }));

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.LOGIN)
        .map(action => action.payload)
        .switchMap((credentials: ICredentials) => this.userService.login(credentials.email, credentials.password)
            .do(loggedInUser => { localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token); })
            .map((loggedInUser) => new user.LoginSuccessAction({ email: loggedInUser.email, token: loggedInUser.token }))
            .merge(Observable.of(go('')))
            .catch(() => Observable.of(new user.LoginFailedAction())));

    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.REGISTRATION)
        .map(action => action.payload)
        .switchMap((credentials: ICredentials) => this.userService.register(credentials.email, credentials.password)
            .do(loggedInUser => { localStorage.setItem(Config.localStorageKeyUser, loggedInUser.token); })
            .map((loggedInUser) => new user.RegistrationSuccessAction({ email: loggedInUser.email, token: loggedInUser.token }))
            .merge(Observable.of(go('')))
            .catch(() => Observable.of(new user.RegistrationFailedAction())));

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(user.ActionTypes.LOGOUT)
        .do(() => localStorage.removeItem(Config.localStorageKeyUser))
        .map(() => new user.LogoutSuccessAction());

    constructor(
        private actions$: Actions,
        @Inject(IUserService) private userService: IUserService,
    ) { }
}
