import { createSelector, Selector } from 'reselect';
import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import * as fromCatalog from './catalog-items.reducer';
import * as fromSaveToLocalStorage from './save-to-local-storage.meta-reducer';
import * as fromSelectedProduct from './selected-product-reducer';
import * as fromCart from './shopping-cart-items.reducer';

import { IProduct } from '../models/product';
import { ICartPosition } from '../models/cartPosition';

export interface IState {
    catalog: fromCatalog.IState;
    selectedProduct: fromSelectedProduct.IState;
    cart: fromCart.IState;
    router: RouterState;
}

const reducers = {
    catalog: fromCatalog.reducer,
    selectedProduct: fromSelectedProduct.reducer,
    cart: fromSaveToLocalStorage.reducer(fromCart.reducer),
    router: routerReducer,
};

const developmentReducer: ActionReducer<IState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IState> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    return environment.production
        ? productionReducer(state, action)
        : developmentReducer(state, action);
};

export const getSelectedProductState = (state: IState) => state.selectedProduct;

export const getSelectedProduct: Selector<IState, IProduct> = createSelector(getSelectedProductState, fromSelectedProduct.getSelectedItem);

export const getCartItemsState = (state: IState) => state.cart;

export const getCartItems: Selector<IState, ICartPosition[]> = createSelector(getCartItemsState, fromCart.getProducts);

export const getCatalogItemsState = (state: IState) => state.catalog;

export const getCatalogItems: Selector<IState, IProduct[]> = createSelector(getCatalogItemsState, fromCatalog.getProducts);
