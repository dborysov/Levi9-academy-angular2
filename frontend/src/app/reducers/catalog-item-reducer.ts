import { ActionReducer, Action } from '@ngrx/store';

import { EDIT_PRODUCT } from '../actions/products-actions';

import { IProduct } from '../models/product';

export const catalogItemReducer: ActionReducer<IProduct> = (state: IProduct, {type, payload}: Action) => {
    switch (type) {
        case EDIT_PRODUCT:
            return state.id === payload.id
                ? Object.assign({}, state, payload)
                : state;

        default:
            return state;
    }
};
