import { createSelector, Selector } from 'reselect';

import { IProduct, ICartPosition, ICartPositionsDetails } from '../models';

import * as fromProducts from '../reducers/products';
import * as fromSelectedProduct from '../reducers/selected-product';

import { IState } from '../reducers';

const getProductsState = (state: IState) => state.products;

const getCatalog = (state: fromProducts.IState) => Object.keys(state.catalog.products)
    .map(item => state.catalog.products[item]) as IProduct[];
const getCatalogFilterTerm = (state: fromProducts.IState) => state.catalog.filterTerm;
const getCartIds = (state: fromProducts.IState) => Object.keys(state.cart.quantity)
    .map(key => ({ id: +key, quantity: state.cart.quantity[key] })) as ICartPosition[];
const getCartDetails = (state: fromProducts.IState) => Object.keys(state.cart.details)
    .map(key => state.cart.details[key] as IProduct);
const getSelectedProduct = (state: fromProducts.IState) => state.selectedProduct.product;

const getCatalogFilterTermSelectorSelector: Selector<IState, string> = createSelector(getProductsState, getCatalogFilterTerm);

export const getCartItemsIdsSelector: Selector<IState, ICartPosition[]> = createSelector(getProductsState, getCartIds);
export const getCartItemsDetailsSelector: Selector<IState, IProduct[]> = createSelector(getProductsState, getCartDetails);

export const getCatalogItemsSelector: Selector<IState, IProduct[]> = createSelector(getProductsState, getCatalog);

export const getSelectedProductSelector: Selector<IState, any> = createSelector(getProductsState, getSelectedProduct);

export const getFilteredCatalogSelector: Selector<IState, IProduct[]> = createSelector(
    getCatalogItemsSelector,
    getCatalogFilterTermSelectorSelector,
    (items, term) => items.filter(item => !term || item.category.indexOf(term) > -1));

export const getCartItemsSelector: Selector<IState, ICartPositionsDetails[]> = createSelector(
    getCartItemsIdsSelector,
    getCartItemsDetailsSelector,
    (cartItems, cartItemsDetails) => cartItems
        .filter(cartItem => cartItemsDetails.some(cartItemDetails => cartItemDetails.id === cartItem.id))
        .map(cartItem => Object.assign({},
            (cartItemsDetails.find(cartItemDetails => cartItemDetails.id === cartItem.id) || cartItem),
            { quantity: cartItem.quantity }) as ICartPositionsDetails)
);
