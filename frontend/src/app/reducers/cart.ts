import { ActionReducer } from '@ngrx/store';
import { IProduct } from '../models';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';

import { ICartPositionsDetails } from '../models';

export interface IState {
    cartItems: ICartPositionsDetails[]
}

export const initialState = { cartItems: [] };

export const reducer: ActionReducer<IState> = (state: IState = initialState, action: cart.Actions | catalog.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.LOAD_SUCCESS:
            return {
                cartItems: action.payload
            }

        case cart.ActionTypes.LOAD_DETAILS_SUCCESS:
            return {
                cartItems: state.cartItems.map(cartItem => {
                    const cartItemDetails = action.payload.find(cartItemDetails => cartItemDetails.id === cartItem.id);

                    return cartItemDetails
                        ? { ...cartItem, ...cartItemDetails, detailsLoaded: true }
                        : cartItem;
                })
            }

        case cart.ActionTypes.ADD_QUANTITY:
            const existingItem = state.cartItems.find(cartItem => cartItem.id === action.payload.id);

            return {
                cartItems: existingItem
                    ? state.cartItems.map(cartItem =>
                        cartItem.id === action.payload.id
                            ? { ...cartItem, quantity: (cartItem.quantity || 0) + (action.payload.quantity || 1) }
                            : cartItem)
                    : [...state.cartItems, action.payload]
            }

        case cart.ActionTypes.REMOVE_QUANTITY:
            const cartItem = state.cartItems.find(cartItem => cartItem.id === action.payload.id);

            if (!cartItem) return state;

            const shouldRemoveItem = !action.payload.quantity
                || action.payload.quantity >= cartItem.quantity;

            return shouldRemoveItem
                ? reducer(state, new cart.RemoveItemAction({ id: action.payload.id }))
                : {
                    cartItems: state.cartItems.map(cartItem => cartItem.id === action.payload.id ? { ...cartItem, quantity: cartItem.quantity - action.payload.quantity } : cartItem)
                };

        case cart.ActionTypes.REMOVE_ITEM:
        case catalog.ActionTypes.DELETE_SUCCESS:
            return {
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }

        case cart.ActionTypes.REMOVE_ALL:
            return initialState;


        default:
            return state;
    }
};
