import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export interface IState {
    [id: number]: IProduct;
}

export const reducer: ActionReducer<IState> = (state: IState = null, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.ADD:
        case catalog.ActionTypes.EDIT:
            return Object.assign({}, state, { [action.payload.id]: action.payload });

        case catalog.ActionTypes.DELETE_ALL:
            return {};

        case catalog.ActionTypes.DELETE:
            const deleteResult = Object.assign({}, state);
            delete deleteResult[action.payload.id];

            return deleteResult;

        default:
            return state;
    }
};
