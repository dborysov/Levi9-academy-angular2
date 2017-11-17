import { Action } from '@ngrx/store';
import { type } from '../util';
import { IProduct } from '../models';

export class ActionTypes {
  static readonly SELECT = type('[Selected Product] Select');
  static readonly SELECT_SUCCESS = type('[Selected Product] Select Success');
  static readonly SELECT_FAILED = type('[Selected Product] Select Failed');
}

export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT;

  constructor(public readonly payload: { id: number }) {}
}

export class SelectSuccessAction implements Action {
  readonly type = ActionTypes.SELECT_SUCCESS;

  constructor(public readonly payload: IProduct) {}
}

export class SelectFailedAction implements Action {
  readonly type = ActionTypes.SELECT_FAILED;
}

export type Actions = SelectAction | SelectSuccessAction | SelectFailedAction;
