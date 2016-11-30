import { ActionReducer, Action } from '@ngrx/store';

import { SELECT_PRODUCT, EDIT_PRODUCT } from '../actions/products-actions';

import { IProduct } from '../models/product';

export const selectedProductReducer: ActionReducer<IProduct> = (state: IProduct, {type, payload}: Action) => {
    switch (type) {
        case SELECT_PRODUCT:
            return payload;

        case EDIT_PRODUCT:
            return state.id === payload.id
                ? Object.assign({}, state, payload)
                : state;

        default:
            return state;
    }
};
