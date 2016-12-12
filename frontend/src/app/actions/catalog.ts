import { Action } from '@ngrx/store';
import { type } from '../util';
import { IProduct } from '../models/product';

export const ActionTypes = {
    ADD: type('[Catalog] Add'),
    DELETE: type('[Catalog] Delete'),
    EDIT: type('[Catalog] Edit'),
    DELETE_ALL: type('[Catalog] Delete All'),
};

export class AddAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: IProduct) { }
}

export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: { id: number }) { }
}

export class EditAction implements Action {
    type = ActionTypes.EDIT;

    constructor(public payload: IProduct) { }
}

export class DeleteAllAction implements Action {
    type = ActionTypes.DELETE_ALL;

    constructor() { }
}

export type Actions
    = AddAction
    | DeleteAction
    | EditAction
    | DeleteAllAction;
