import { Action } from '@ngrx/store';
import { type } from '../util';
import { ICartPosition } from '../models/cartPosition';

export const ActionTypes = {
    LOAD: type('[Cart] Load'),
    LOAD_SUCCESS: type('[Cart] Load Success'),
    ADD_QUANTITY: type('[Cart] Add Quantity'),
    REMOVE_QUANTITY: type('[Cart] Remove Quantity'),
    REMOVE_ITEM: type('[Cart] Remove Item'),
    REMOVE_ALL: type('[Cart] Remove All'),
};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
};

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: ICartPosition[]) { }
};

export class AddQuantityAction implements Action {
    type = ActionTypes.ADD_QUANTITY;

    constructor(public payload: ICartPosition) { }
};

export class RemoveQuantityAction implements Action {
    type = ActionTypes.REMOVE_QUANTITY;

    constructor(public payload: ICartPosition) { }
};

export class RemoveItemAction implements Action {
    type = ActionTypes.REMOVE_ITEM;

    constructor(public payload: { id: number }) { }
};

export class RemoveAllAction implements Action {
    type = ActionTypes.REMOVE_ALL;
};

export type Actions
    = LoadAction
    | LoadSuccessAction
    | AddQuantityAction
    | RemoveQuantityAction
    | RemoveItemAction
    | RemoveAllAction;
