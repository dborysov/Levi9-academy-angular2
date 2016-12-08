import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export interface IState {
    product: IProduct;
}

export const catalogItemReducer: ActionReducer<IState> = (state: IState, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.EDIT:
            return state.product.id === action.payload.id
                ? { product: action.payload }
                : state;

        default:
            return state;
    }
};
