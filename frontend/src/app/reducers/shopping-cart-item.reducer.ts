import { ActionReducer, Action, } from '@ngrx/store';
import { ICartPosition } from '../models/cartPosition';
import { ADD_QUANTITY, REMOVE_QUANTITY } from '../actions/cart-item-actions';

export const shoppingCartItemReducer: ActionReducer<ICartPosition> = (state: ICartPosition, {type, payload}: Action) => {
    switch (type) {
        case ADD_QUANTITY:
            return state.id === payload.id
                ? Object.assign({}, state, { quantity: state.quantity + payload.quantity })
                : state;

        case REMOVE_QUANTITY:
            return state.id === payload.id && state.quantity > payload.quantity
                ? Object.assign({}, state, { quantity: state.quantity - payload.quantity })
                : state;

        default:
            return state;
    }
};