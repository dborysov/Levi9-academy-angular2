import { ActionReducer } from '@ngrx/store';

import * as catalogActions from '../actions/catalog';
import * as cartActions from '../actions/cart';
import * as selectedProductActions from '../actions/selectedProduct';

import * as catalog from './catalog';
import * as cart from './cart';
import * as selectedProduct from './selected-product';

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
