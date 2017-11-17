import { createSelector, Selector } from 'reselect';

import { IProduct, ICartPosition, ICartPositionsDetails } from '../models';

import * as fromProducts from '../reducers/products';

import { IState } from '../reducers';

const getProductsState = (state: IState) => state.products;

const getCatalog = (state: fromProducts.IState) => state.catalog.products;
const getCatalogFilterTerm = (state: fromProducts.IState) => state.catalog.filterTerm;
const getLoadedCartItems = (state: fromProducts.IState) =>
  state.cart.cartItems.filter(cartItem => cartItem.detailsLoaded);
const getCartItems = (state: fromProducts.IState) =>
  state.cart.cartItems.map(
    cartItem => ({ id: cartItem.id, quantity: cartItem.quantity } as ICartPosition),
  );
const getSelectedProduct = (state: fromProducts.IState) => state.selectedProduct.product;

const getCatalogFilterTermSelectorSelector: Selector<IState, string> = createSelector(
  getProductsState,
  getCatalogFilterTerm,
);

export const getLoadedCartItemsSelector: Selector<IState, ICartPositionsDetails[]> = createSelector(
  getProductsState,
  getLoadedCartItems,
);
export const getCartItemsSelector: Selector<IState, ICartPosition[]> = createSelector(
  getProductsState,
  getCartItems,
);

export const getCatalogItemsSelector: Selector<IState, IProduct[]> = createSelector(
  getProductsState,
  getCatalog,
);

export const getSelectedProductSelector: Selector<IState, IProduct> = createSelector(
  getProductsState,
  getSelectedProduct,
);

export const getFilteredCatalogSelector: Selector<
  IState,
  IProduct[]
> = createSelector(getCatalogItemsSelector, getCatalogFilterTermSelectorSelector, (items, term) =>
  items.filter(item => !term || item.category.indexOf(term) > -1),
);
