import { ActionReducer, Action, } from '@ngrx/store';
import { shoppingCartItemReducer } from './shopping-cart-item.reducer';
import { ADD_QUANTITY, REMOVE, REMOVE_ALL, REMOVE_QUANTITY } from '../actions/cart-item-actions';
import { ICartPosition } from '../models/cartPosition';

export const cartStoreReducer: ActionReducer<ICartPosition[]> = (state: ICartPosition[], {type, payload}: Action) => {
    switch (type) {
        case ADD_QUANTITY:
            return state.some(el => el.id === payload.id)
                ? state.map(item => shoppingCartItemReducer(item, { type, payload }))
                : [...state, payload];

        case REMOVE_QUANTITY:
            return state.some(el => el.id === payload.id && el.quantity > payload.quantity)
                ? state.map(item => shoppingCartItemReducer(item, { type, payload }))
                : cartStoreReducer(state, {type: REMOVE, payload});

        case REMOVE:
            return state.filter(item => item.id !== payload.id);

        case REMOVE_ALL:
            return [];

        default:
            return state;
    }
};
