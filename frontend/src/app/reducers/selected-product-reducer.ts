import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export interface IState {
    product: IProduct;
}

const initialValue: IState = {
    product: null
}

export const reducer: ActionReducer<IState> = (state = initialValue, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.SELECT:
            return { product: action.payload };

        case catalog.ActionTypes.EDIT:
            return state.product.id === action.payload.id
                ? { product: action.payload }
                : state;

        default:
            return state;
    }
};

export const getSelectedItem = (state: IState) => state.product;
