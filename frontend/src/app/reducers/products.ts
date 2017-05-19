import { ActionReducer, combineReducers } from '@ngrx/store';

import * as catalog from './catalog';
import * as cart from './cart';
import * as selectedProduct from './selected-product';

export interface IState {
    catalog: catalog.IState;
    cart: cart.IState;
    selectedProduct: selectedProduct.IState;
};

export const reducer: ActionReducer<IState> = combineReducers({
    cart: cart.reducer,
    catalog: catalog.reducer,
    selectedProduct: selectedProduct.reducer,
});
