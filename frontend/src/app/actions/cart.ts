import { Action } from '@ngrx/store';
import { type } from '../util';
import { ICartPosition, IProduct } from '../models';

export class ActionTypes {
    static readonly LOAD = type('[Cart] Load');
    static readonly LOAD_SUCCESS = type('[Cart] Load Success');
    static readonly LOAD_DETAILS = type('[Cart] Load Details');
    static readonly LOAD_DETAILS_SUCCESS = type('[Cart] Load Details Success');
    static readonly LOAD_DETAILS_FAILED = type('[Cart] Load Details Failed');
    static readonly ADD_QUANTITY = type('[Cart] Add Quantity');
    static readonly REMOVE_QUANTITY = type('[Cart] Remove Quantity');
    static readonly REMOVE_ITEM = type('[Cart] Remove Item');
    static readonly REMOVE_ALL = type('[Cart] Remove All');
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
};

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: ICartPosition[]) { }
};

export class LoadDetailsAction implements Action {
    readonly type = ActionTypes.LOAD_DETAILS;

    constructor(public payload: ICartPosition[]) { }
};

export class LoadDetailsSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_DETAILS_SUCCESS;

    constructor(public payload: IProduct[]) { }
};

export class LoadDetailsFailedAction implements Action {
    readonly type = ActionTypes.LOAD_DETAILS_FAILED;
};

export class AddQuantityAction implements Action {
    readonly type = ActionTypes.ADD_QUANTITY;

    constructor(public payload: ICartPosition) { }
};

export class RemoveQuantityAction implements Action {
    readonly type = ActionTypes.REMOVE_QUANTITY;

    constructor(public payload: ICartPosition) { }
};

export class RemoveItemAction implements Action {
    readonly type = ActionTypes.REMOVE_ITEM;

    constructor(public payload: { id: number }) { }
};

export class RemoveAllAction implements Action {
    readonly type = ActionTypes.REMOVE_ALL;
};

export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadDetailsAction
    | LoadDetailsSuccessAction
    | LoadDetailsFailedAction
    | AddQuantityAction
    | RemoveQuantityAction
    | RemoveItemAction
    | RemoveAllAction;
