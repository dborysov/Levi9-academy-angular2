import { ActionReducer } from '@ngrx/store';

import * as catalogActions from '../actions/catalog';
import * as cartActions from '../actions/cart';
import * as selectedProductActions from '../actions/selectedProduct';

import * as catalog from './catalog';
import * as cart from './cart';
import * as selectedProduct from './selected-product';

import { IProduct } from '../models/product';
import { ICartPosition } from '../models/cartPosition';

export interface IState {
    catalog: catalog.IState;
    cart: cart.IState;
    selectedProduct: selectedProduct.IState;
};

const initialValue: IState = {
    catalog: {
        products: {},
        filterTerm: '',
    },
    cart: {
        quantity: {},
        details: {},
    },
    selectedProduct: { id: null },
};

type actionType = catalogActions.Actions | cartActions.Actions | selectedProductActions.Actions;

export const reducer: ActionReducer<IState> = (state = initialValue, action: actionType) => {
    return {
        cart: cart.reducer(state.cart, action),
        catalog: catalog.reducer(state.catalog, action),
        selectedProduct: selectedProduct.reducer(state.selectedProduct, action),
    };
};

export const getCatalog = (state: IState) => Object.keys(state.catalog.products).map(item => state.catalog.products[item]) as IProduct[];
export const getCatalogFilterTerm = (state: IState) => state.catalog.filterTerm;
export const getCartIds = (state: IState) => Object.keys(state.cart.quantity)
    .map(key => ({ id: +key, quantity: state.cart.quantity[key] })) as ICartPosition[];
export const getCartDetails = (state: IState) => Object.keys(state.cart.details)
    .map(key => state.cart.details[key] as IProduct);
export const getSelectedProduct = (state: IState) => state.selectedProduct;
