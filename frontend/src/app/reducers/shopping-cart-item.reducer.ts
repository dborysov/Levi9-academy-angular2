import { ActionReducer, Action, } from '@ngrx/store';
import { ICartItem } from './shopping-cart-items.reducer';
import { ADD_QUANTITY } from '../actions/cart-item-actions';

export const shoppingCartItemReducer: ActionReducer<ICartItem> = (state: ICartItem, action: Action) => {
    switch (action.type) {
        case ADD_QUANTITY:
            return state.id === action.payload.id
                ? Object.assign({}, state, { quantity: state.quantity + action.payload.quantity })
                : state;

        default:
            return state;
    }
};