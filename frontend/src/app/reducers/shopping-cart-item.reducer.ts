import { ActionReducer, Action, } from '@ngrx/store';
import { IProduct } from '../models/product';
import { ADD_QUANTITY } from '../actions/cart-item-actions';

export const shoppingCartItemReducer: ActionReducer<IProduct> = (state: IProduct, {type, payload}: Action) => {
    switch (type) {
        case ADD_QUANTITY:
            return state.id === payload.id
                ? Object.assign({}, state, { quantity: state.quantity + payload.quantity })
                : state;

        default:
            return state;
    }
};