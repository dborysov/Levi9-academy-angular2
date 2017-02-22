import { Action } from '@ngrx/store';
import { type } from '../util';

export class ActionTypes {
    static readonly SELECT = type('[Selected Product] Select');
};

export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: { id: number }) { }
};

export type Actions
    = SelectAction;
