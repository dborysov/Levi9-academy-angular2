import { ActionReducer } from '@ngrx/store';

import * as catalogActions from '../actions/catalog';
import * as cartActions from '../actions/cart';
import * as selectedProductActions from '../actions/selectedProduct';

import * as catalog from './catalog';
import * as cart from './cart';
import * as selectedProduct from './selected-product';

import { reducer as saveToLocalStorage } from '../meta-reducers/save-to-local-storage';

import { IProduct } from '../models/product';
import { ICartPosition } from '../models/cartPosition';

export interface IState {
    catalog: catalog.IState;
    cart: cart.IState;
    selectedProduct: selectedProduct.IState;
};

const initialValue: IState = {
    catalog: {},
    cart: {},
    selectedProduct: { id: null },
};

type actionType = catalogActions.Actions | cartActions.Actions | selectedProductActions.Actions;

export const reducer: ActionReducer<IState> = (state = initialValue, action: actionType) => {
    return {
        cart: saveToLocalStorage(cart.reducer)(state.cart, action),
        catalog: catalog.reducer(state.catalog, action),
        selectedProduct: selectedProduct.reducer(state.selectedProduct, action),
    };
};

export const getCatalog = (state: IState) => Object.keys(state.catalog).map(item => state.catalog[item]) as IProduct[];
export const getCartIds = (state: IState) => Object.keys(state.cart)
    .map(item => ({ id: +item, quantity: state.cart[item] })) as ICartPosition[];
export const getSelectedProduct = (state: IState) => state.selectedProduct;
