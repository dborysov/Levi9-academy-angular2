import { ActionReducer } from '@ngrx/store';

import * as selectedProduct from '../actions/selectedProduct';
import { IProduct } from '../models';

export interface IState {
    product: IProduct;
}

export const initialState: IState = { product: null };

export const reducer: ActionReducer<IState> = (state: IState = initialState, action: selectedProduct.Actions) => {
    switch (action.type) {
        case selectedProduct.ActionTypes.SELECT_SUCCESS:
            return { ...state, product: action.payload};

        default:
            return state;
    }
};
