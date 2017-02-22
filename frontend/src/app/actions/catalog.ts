import { Action } from '@ngrx/store';
import { type } from '../util';
import { IProduct } from '../models';

export class ActionTypes {
    static readonly LOAD = type('[Catalog] Load');
    static readonly LOAD_SUCCESS = type('[Catalog] Load Success');
    static readonly LOAD_FAILED = type('[Catalog] Load Failed');
    static readonly ADD = type('[Catalog] Add');
    static readonly ADD_SUCCESS = type('[Catalog] Add Success');
    static readonly ADD_FAILED = type('[Catalog] Add Failed');
    static readonly DELETE = type('[Catalog] Delete');
    static readonly DELETE_SUCCESS = type('[Catalog] Delete Success');
    static readonly DELETE_FAILED = type('[Catalog] Delete Failed');
    static readonly EDIT = type('[Catalog] Edit');
    static readonly DELETE_ALL = type('[Catalog] Delete All');
    static readonly SET_FILTER_TERM = type('[Catalog] Set Filter Term');
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public readonly payload: IProduct[]) { }
}

export class LoadFailedAction implements Action {
    readonly type = ActionTypes.LOAD_FAILED;
}

export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public readonly payload: IProduct) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public readonly payload: IProduct) { }
}

export class AddFailedAction implements Action {
    readonly type = ActionTypes.ADD_FAILED;

    constructor(public readonly payload: IProduct) { }
}

export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;

    constructor(public readonly payload: IProduct) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;

    constructor(public readonly payload: IProduct) { }
}

export class DeleteFailedAction implements Action {
    readonly type = ActionTypes.DELETE_FAILED;

    constructor(public readonly payload: IProduct) { }
}

export class EditAction implements Action {
    readonly type = ActionTypes.EDIT;

    constructor(public readonly payload: IProduct) { }
}

export class DeleteAllAction implements Action {
    readonly type = ActionTypes.DELETE_ALL;
}

export class SetFilterTermAction implements Action {
    readonly type = ActionTypes.SET_FILTER_TERM;

    constructor(public readonly payload: { filterTerm: string }) { }
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
