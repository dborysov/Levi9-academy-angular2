import { ActionReducer, Action, } from '@ngrx/store';
import { shoppingCartItemReducer } from './shopping-cart-item.reducer';
import { ADD_QUANTITY, REMOVE, REMOVE_ALL } from '../actions/cart-item-actions';
import { IProduct } from '../models/product';

export const cartStoreReducer: ActionReducer<IProduct[]> = (state: IProduct[], {type, payload}: Action) => {
    switch (type) {
        case ADD_QUANTITY:
            return state.some(el => el.id === payload.id)
                ? state.map(item => shoppingCartItemReducer(item, { type, payload }))
                : [...state, payload];

        case REMOVE:
            return state.filter(item => item.id !== payload.id);

        case REMOVE_ALL:
            return [];

        default:
            return state;
    }
};
