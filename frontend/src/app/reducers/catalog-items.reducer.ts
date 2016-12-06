import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { catalogItemReducer } from './catalog-item-reducer';

import { IProduct } from '../models/product';

export const catalogItemsReducer: ActionReducer<IProduct[]> = (state: IProduct[], action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.ADD:
            return state.some(product => product.id === action.payload.id)
                ? state
                : [...state, action.payload];

        case catalog.ActionTypes.DELETE_ALL:
            return [];

        case catalog.ActionTypes.EDIT:
            return state.map(product => catalogItemReducer(product, action));

        case catalog.ActionTypes.DELETE:
            return state.filter(product => product.id !== action.payload.id);

        default:
            return state;
    }
};
