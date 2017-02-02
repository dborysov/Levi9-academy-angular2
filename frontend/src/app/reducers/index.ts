import { createSelector, Selector } from 'reselect';
import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import { IProduct } from '../models/product';
import { ICartPosition } from '../models/cartPosition';
import { ICartPositionsDetails } from '../models/cartPositionsDetails';

import * as fromProducts from './products';
import * as fromUser from './user';

import * as fromSelectedProduct from './selected-product';

export interface IState {
    products: fromProducts.IState;
    user: fromUser.IState;
    router: RouterState;
}

const reducers = {
    products: fromProducts.reducer,
    user: fromUser.reducer,
    router: routerReducer,
};

const developmentReducer: ActionReducer<IState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IState> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    return environment.production
        ? productionReducer(state, action)
        : developmentReducer(state, action);
};

export const getProductsState = (state: IState) => state.products;

const getSelectedProductId: Selector<IState, fromSelectedProduct.IState> = createSelector(
    getProductsState,
    fromProducts.getSelectedProduct);

export const getCartItemsIds: Selector<IState, ICartPosition[]> = createSelector(getProductsState, fromProducts.getCartIds);
export const getCartItemsDetails: Selector<IState, IProduct[]> = createSelector(getProductsState, fromProducts.getCartDetails);

export const getCatalogItems: Selector<IState, IProduct[]> = createSelector(getProductsState, fromProducts.getCatalog);
export const getCatalogFilterTerm: Selector<IState, string> = createSelector(getProductsState, fromProducts.getCatalogFilterTerm);

export const getFilteredCatalog: Selector<IState, IProduct[]> = createSelector(
    getCatalogItems,
    getCatalogFilterTerm,
    (items, term) => items.filter(item => !term || item.category.indexOf(term) > -1));

export const getSelectedProduct: Selector<IState, IProduct> = createSelector(
    getSelectedProductId,
    getCatalogItems,
    (selectedProductId: fromSelectedProduct.IState, catalog: IProduct[]) => catalog.find(item => item.id === selectedProductId.id));

export const getCartItems: Selector<IState, ICartPositionsDetails[]> = createSelector(
    getCartItemsIds,
    getCartItemsDetails,
    (cartItems, cartItemsDetails) => cartItems
        .filter(cartItem => cartItemsDetails.some(cartItemDetails => cartItemDetails.id === cartItem.id))
        .map(cartItem => Object.assign({},
            (cartItemsDetails.find(cartItemDetails => cartItemDetails.id === cartItem.id) || cartItem),
            { quantity: cartItem.quantity }) as ICartPositionsDetails)
);

export const getUserState = (state: IState) => state.user;
export const getUserIsSignedIn: Selector<IState, boolean> = createSelector(
    getUserState,
    fromUser.getIsSignedIn
);

export const getUserEmail: Selector<IState, string> = createSelector(
    getUserState,
    fromUser.getEmail
);

export const getUserToken: Selector<IState, string> = createSelector(
    getUserState,
    fromUser.getToken
);
