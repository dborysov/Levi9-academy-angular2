import { createSelector } from 'reselect';
import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import * as fromCatalog from './catalog-items.reducer';
import * as fromSaveToLocalStorage from './save-to-local-storage.meta-reducer';
import * as fromSelectedProduct from './selected-product-reducer';
import * as fromCart from './shopping-cart-items.reducer';

export interface IState {
    catalog: fromCatalog.IState;
    selectedProduct: fromSelectedProduct.IState;
    cart: fromCart.IState;
}

const reducers = {
    catalog: fromCatalog.reducer,
    selectedProduct: fromSelectedProduct.reducer,
    cart: fromSaveToLocalStorage.reducer(fromCart.reducer),
};

const developmentReducer: ActionReducer<IState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IState> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    return environment.production
        ? productionReducer(state, action)
        : developmentReducer(state, action);
};

const getSelectedProductState = (state: IState) => state.selectedProduct;

export const getSelectedProduct = createSelector(getSelectedProductState, fromSelectedProduct.getSelectedItem);

const getCartItemsState = (state: IState) => state.cart;

export const getCartItems = createSelector(getCartItemsState, fromCart.getProducts);

const getCatalogItemsState = (state: IState) => state.catalog;

export const getCatalogItems = createSelector(getCatalogItemsState, fromCatalog.getProducts);
