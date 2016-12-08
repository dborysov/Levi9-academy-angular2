import { ActionReducer } from '@ngrx/store';
import { ICartPosition } from '../models/cartPosition';
import * as cart from '../actions/cart';

interface IState {
    product: ICartPosition;
}

export const shoppingCartItemReducer: ActionReducer<IState> = (state: IState, action: cart.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.ADD_QUANTITY:
            return state.product.id === action.payload.id
                ? { product: Object.assign({}, state.product, { quantity: state.product.quantity + action.payload.quantity }) }
                : state;

        case cart.ActionTypes.REMOVE_QUANTITY:
            return state.product.id === action.payload.id && state.product.quantity > action.payload.quantity
                ? { product: Object.assign({}, state.product, { quantity: state.product.quantity - action.payload.quantity }) }
                : state;

        default:
            return state;
    }
};