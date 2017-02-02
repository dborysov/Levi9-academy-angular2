import { Action } from '@ngrx/store';
import { type } from '../util';
import { IProduct } from '../models/product';

export const ActionTypes = {
    LOAD: type('[Catalog] Load'),
    LOAD_SUCCESS: type('[Catalog] Load Success'),
    LOAD_FAILED: type('[Catalog] Load Failed'),
    ADD: type('[Catalog] Add'),
    ADD_SUCCESS: type('[Catalog] Add Success'),
    ADD_FAILED: type('[Catalog] Add Failed'),
    DELETE: type('[Catalog] Delete'),
    DELETE_SUCCESS: type('[Catalog] Delete Success'),
    DELETE_FAILED: type('[Catalog] Delete Failed'),
    EDIT: type('[Catalog] Edit'),
    DELETE_ALL: type('[Catalog] Delete All'),
    SET_FILTER_TERM: type('[Catalog] Set Filter Term'),
};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: IProduct[]) { }
}

export class LoadFailedAction implements Action {
    type = ActionTypes.LOAD_FAILED;
}

export class AddAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: IProduct) { }
}

export class AddSuccessAction implements Action {
    type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: IProduct) { }
}

export class AddFailedAction implements Action {
    type = ActionTypes.ADD_FAILED;

    constructor(public payload: IProduct) { }
}

export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: IProduct) { }
}

export class DeleteSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: IProduct) { }
}

export class DeleteFailedAction implements Action {
    type = ActionTypes.DELETE_FAILED;

    constructor(public payload: IProduct) { }
}

export class EditAction implements Action {
    type = ActionTypes.EDIT;

    constructor(public payload: IProduct) { }
}

export class DeleteAllAction implements Action {
    type = ActionTypes.DELETE_ALL;
}

export class SetFilterTermAction implements Action {
    type = ActionTypes.SET_FILTER_TERM;

    constructor(public payload: { filterTerm: string }) { }
};

export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailedAction
    | AddAction
    | AddSuccessAction
    | AddFailedAction
    | DeleteAction
    | DeleteSuccessAction
    | DeleteFailedAction
    | EditAction
    | DeleteAllAction
    | SetFilterTermAction;
