import { ActionReducer, Action, } from '@ngrx/store';
import { shoppingCartItemReducer } from './shopping-cart-item.reducer';
import { ADD_QUANTITY, REMOVE, REMOVE_ALL } from '../actions/cart-item-actions';
export interface ICartItem {
    id: number;
    quantity: number;
}

export const cartStoreReducer: ActionReducer<ICartItem[]> = (state: ICartItem[], action: Action) => {
    switch (action.type) {
        case ADD_QUANTITY:
            return state.some(el => el.id === action.payload.id)
                ? state.map(item => shoppingCartItemReducer(item, action))
                : [...state, { id: action.payload.id, quantity: action.payload.quantity }];

        case REMOVE:
            return state
                .filter(item => item.id !== action.payload.id);

        case REMOVE_ALL:
            return [];

        default:
            return state;
    }
};
