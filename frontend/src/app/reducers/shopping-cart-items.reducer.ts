import { ActionReducer } from '@ngrx/store';
import { shoppingCartItemReducer } from './shopping-cart-item.reducer';
import * as cart from '../actions/cart';
import { ICartPosition } from '../models/cartPosition';

import { Config } from '../config';

export interface IState {
    products: ICartPosition[];
}

const initialValue: IState = {
    products: JSON.parse(localStorage.getItem(Config.localStorageKeyChart)) || []
};

export const reducer: ActionReducer<IState> = (state = initialValue, action: cart.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.ADD_QUANTITY:
            return state.products.some(el => el.id === action.payload.id)
                ? { products: state.products.map(product => shoppingCartItemReducer({ product }, action).product) }
                : { products: [...state.products, action.payload] };

        case cart.ActionTypes.REMOVE_QUANTITY:
            return state.products.some(el => el.id === action.payload.id && el.quantity > action.payload.quantity)
                ? { products: state.products.map(product => shoppingCartItemReducer({ product }, action).product) }
                : reducer(state, new cart.RemoveItemAction(action.payload));

        case cart.ActionTypes.REMOVE_ITEM:
            return { products: state.products.filter(product => product.id !== action.payload.id) };

        case cart.ActionTypes.REMOVE_ALL:
            return { products: [] };

        default:
            return state;
    }
};

export const getProducts = (state: IState) => state.products;
