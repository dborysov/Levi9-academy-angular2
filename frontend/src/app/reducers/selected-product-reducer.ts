import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export const selectedProductReducer: ActionReducer<IProduct> = (state: IProduct, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.SELECT:
            return action.payload;

        case catalog.ActionTypes.EDIT:
            return state.id === action.payload.id
                ? Object.assign({}, state, action.payload)
                : state;

        default:
            return state;
    }
};
