import { ActionReducer } from '@ngrx/store';
import { shoppingCartItemReducer } from './shopping-cart-item.reducer';
import * as cart from '../actions/cart';
import { ICartPosition } from '../models/cartPosition';

export const cartStoreReducer: ActionReducer<ICartPosition[]> = (state: ICartPosition[], action: cart.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.ADD_QUANTITY:
            return state.some(el => el.id === action.payload.id)
                ? state.map(item => shoppingCartItemReducer(item, action))
                : [...state, action.payload];

        case cart.ActionTypes.REMOVE_QUANTITY:
            return state.some(el => el.id === action.payload.id && el.quantity > action.payload.quantity)
                ? state.map(item => shoppingCartItemReducer(item, action))
                : cartStoreReducer(state, new cart.RemoveItemAction(action.payload));

        case cart.ActionTypes.REMOVE_ITEM:
            return state.filter(item => item.id !== action.payload.id);

        case cart.ActionTypes.REMOVE_ALL:
            return [];

        default:
            return state;
    }
};
