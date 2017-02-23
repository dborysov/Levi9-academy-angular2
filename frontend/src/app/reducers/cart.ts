import { ActionReducer } from '@ngrx/store';
import { IProduct } from '../models';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';

export interface IState {
    quantity: { [id: number]: number };
    details: { [id: number]: IProduct };
}

export const initialState = { quantity: {}, details: {} };

export const reducer: ActionReducer<IState> = (state: IState = initialState, action: cart.Actions | catalog.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.LOAD_SUCCESS:
            return {
                ...state,
                quantity: action.payload.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.quantity }), {}),
            };

        case cart.ActionTypes.LOAD_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.payload.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {})
                }
            };

        case cart.ActionTypes.ADD_QUANTITY:
            return {
                ...state,
                quantity: {
                    ...state.quantity,
                    [action.payload.id]: (state.quantity[action.payload.id] || 0) + action.payload.quantity || 1
                }
            };

        case cart.ActionTypes.REMOVE_QUANTITY:
            const shouldIgnore = !state.quantity[action.payload.id];
            if (shouldIgnore) { return state; }

            const shouldRemoveItem = !action.payload.quantity
                || action.payload.quantity >= state.quantity[action.payload.id];

            return shouldRemoveItem
                ? reducer(state, new cart.RemoveItemAction({ id: action.payload.id }))
                : {
                    ...state,
                    quantity: {
                        ...state.quantity,
                        [action.payload.id]: Math.max((state.quantity[action.payload.id] || 0) - action.payload.quantity)
                    },
                };

        case cart.ActionTypes.REMOVE_ITEM:
        case catalog.ActionTypes.DELETE_SUCCESS:
            const removeItemResult = {
                quantity: { ...state.quantity },
                details: { ...state.details },
            };

            delete removeItemResult.quantity[action.payload.id];
            delete removeItemResult.details[action.payload.id];

            return removeItemResult;

        case cart.ActionTypes.REMOVE_ALL:
            return initialState;


        default:
            return state;
    }
};
