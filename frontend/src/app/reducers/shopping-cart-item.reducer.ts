import { ActionReducer } from '@ngrx/store';
import { ICartPosition } from '../models/cartPosition';
import * as cart from '../actions/cart';

export const shoppingCartItemReducer: ActionReducer<ICartPosition> = (state: ICartPosition, action: cart.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.ADD_QUANTITY:
            return state.id === action.payload.id
                ? Object.assign({}, state, { quantity: state.quantity + action.payload.quantity })
                : state;

        case cart.ActionTypes.REMOVE_QUANTITY:
            return state.id === action.payload.id && state.quantity > action.payload.quantity
                ? Object.assign({}, state, { quantity: state.quantity - action.payload.quantity })
                : state;

        default:
            return state;
    }
};