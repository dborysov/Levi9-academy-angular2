import { Action } from '@ngrx/store';
import { type } from '../util';

import { IUser, ICredentials } from '../models';

export class ActionTypes {
  static readonly LOAD_CURRENT = type('[User] Load Current');
  static readonly LOAD_CURRENT_SUCCESS = type('[User] Load Current Success');
  static readonly LOAD_CURRENT_FAILED = type('[User] Load Current Failed');
  static readonly LOGIN = type('[User] Login');
  static readonly LOGIN_SUCCESS = type('[User] Login Success');
  static readonly LOGIN_FAILED = type('[User] Login Failed');
  static readonly REGISTRATION = type('[User] Registration');
  static readonly REGISTRATION_SUCCESS = type('[User] Registration Success');
  static readonly REGISTRATION_FAILED = type('[User] Registration Failed');
  static readonly LOGOUT = type('[User] Logout');
  static readonly LOGOUT_SUCCESS = type('[User] Logout Success');
}

export class LoadCurrentAction implements Action {
  readonly type = ActionTypes.LOAD_CURRENT;
}

export class LoadCurrentSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_SUCCESS;

  constructor(public readonly payload: IUser) {}
}

export class LoadCurrentFailedAction implements Action {
  readonly type = ActionTypes.LOAD_CURRENT_FAILED;
}

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public readonly payload: ICredentials) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public readonly payload: IUser) {}
}

export class LoginFailedAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILED;
}

export class RegistrationAction implements Action {
  readonly type = ActionTypes.REGISTRATION;

  constructor(public readonly payload: ICredentials) {}
}

export class RegistrationSuccessAction implements Action {
  readonly type = ActionTypes.REGISTRATION_SUCCESS;

  constructor(public readonly payload: IUser) {}
}

export class RegistrationFailedAction implements Action {
  readonly type = ActionTypes.REGISTRATION_FAILED;
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export type Actions =
  | LoadCurrentAction
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
