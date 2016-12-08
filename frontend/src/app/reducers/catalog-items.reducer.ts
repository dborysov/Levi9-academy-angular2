import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { catalogItemReducer } from './catalog-item-reducer';

import { IProduct } from '../models/product';

export interface IState {
    products: IProduct[];
}

const initialValue: IState = {
    products: []
}

export const reducer: ActionReducer<IState> = (state = initialValue, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.ADD:
            return state.products.some(product => product.id === action.payload.id)
                ? state
                : { products: [...state.products, action.payload] };

        case catalog.ActionTypes.DELETE_ALL:
            return { products: [] };

        case catalog.ActionTypes.EDIT:
            return { products: state.products.map(product => catalogItemReducer({ product }, action).product) };

        case catalog.ActionTypes.DELETE:
            return { products: state.products.filter(product => product.id !== action.payload.id) };

        default:
            return state;
    }
};

export const getProducts = (state: IState) => state.products;
