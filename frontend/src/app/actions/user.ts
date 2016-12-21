import { Action } from '@ngrx/store';
import { type } from '../util';

import { IUser } from '../models/user';
import { ICredentials } from '../models/credentials';

export const ActionTypes = {
    LOAD_CURRENT: type('[User] Load Current'),
    LOAD_CURRENT_SUCCESS: type('[User] Load Current Success'),
    LOAD_CURRENT_FAILED: type('[User] Load Current Failed'),
    LOGIN: type('[User] Login'),
    LOGIN_SUCCESS: type('[User] Login Success'),
    LOGIN_FAILED: type('[User] Login Failed'),
    REGISTRATION: type('[User] Registration'),
    REGISTRATION_SUCCESS: type('[User] Registration Success'),
    REGISTRATION_FAILED: type('[User] Registration Failed'),
    LOGOUT: type('[User] Logout'),
    LOGOUT_SUCCESS: type('[User] Logout Success'),
};

export class LoadCurrentAction implements Action {
    type = ActionTypes.LOAD_CURRENT;
};

export class LoadCurrentSuccessAction implements Action {
    type = ActionTypes.LOAD_CURRENT_SUCCESS;

    constructor(public payload: IUser) { }
};

export class LoadCurrentFailedAction implements Action {
    type = ActionTypes.LOAD_CURRENT_FAILED;
};

export class LoginAction implements Action {
    type = ActionTypes.LOGIN;

    constructor(public payload: ICredentials) { }
};

export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: IUser) { }
};

export class LoginFailedAction implements Action {
    type = ActionTypes.LOGIN_FAILED;
};

export class RegistrationAction implements Action {
    type = ActionTypes.REGISTRATION;

    constructor(public payload: ICredentials) { }
};

export class RegistrationSuccessAction implements Action {
    type = ActionTypes.REGISTRATION_SUCCESS;

    constructor(public payload: IUser) { }
};

export class RegistrationFailedAction implements Action {
    type = ActionTypes.REGISTRATION_FAILED;
};

export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;
};

export class LogoutSuccessAction implements Action {
    type = ActionTypes.LOGOUT_SUCCESS;
};

export type Actions
    = LoadCurrentAction
    | LoadCurrentSuccessAction
    | LoadCurrentFailedAction
    | LoginAction
    | LoginSuccessAction
    | LoginFailedAction
    | RegistrationAction
    | RegistrationSuccessAction
    | RegistrationFailedAction
    | LogoutAction
    | LogoutSuccessAction;
