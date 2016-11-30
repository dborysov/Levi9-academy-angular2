import { ActionReducer, Action } from '@ngrx/store';

import { ADD_PRODUCT, REMOVE_ALL_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/products-actions';

import { catalogItemReducer } from './catalog-item-reducer';

import { IProduct } from '../models/product';

export const catalogItemsReducer: ActionReducer<IProduct[]> = (state: IProduct[], {type, payload}: Action) => {
    switch (type) {
        case ADD_PRODUCT:
            return state.some(product => product.id === payload.id)
                ? state
                : [...state, payload];

        case REMOVE_ALL_PRODUCTS:
            return [];

        case EDIT_PRODUCT:
            return state.map(product => catalogItemReducer(product, {type, payload}));

        case DELETE_PRODUCT:
            return state.filter(product => product.id !== payload.id);

        default:
            return state;
    }
};
