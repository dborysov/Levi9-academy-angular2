import { type } from 'app/util';
import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export class ActionTypes {
  static readonly BACK = type('[Router] Back');
  static readonly FORWARD = type('[Router] Forward');
  static readonly GO = type('[Router] Go');
}

export class Back implements Action {
  readonly type = ActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = ActionTypes.FORWARD;
}

export class Go implements Action {
  readonly type = ActionTypes.GO;

  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    },
  ) {}
}

export type Actions = Back | Forward | Go;
