import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
    SELECT: type('[Selected Product] Select'),
};

export class SelectAction implements Action {
    type = ActionTypes.SELECT;

    constructor(public payload: { id: number }) { }
};

export type Actions
    = SelectAction;
