import { ActionReducer } from '@ngrx/store';
import * as cart from '../actions/cart';

export interface IState {
    [id: number]: number;
}

const initialState = {};

export const reducer: ActionReducer<IState> = (state: IState = initialState, action: cart.Actions) => {
    switch (action.type) {
        case cart.ActionTypes.LOAD_SUCCESS:
            return action.payload.reduce(
                (newState, cartItem) => reducer(newState, new cart.AddQuantityAction(cartItem)),
                initialState);

        case cart.ActionTypes.ADD_QUANTITY:
            return Object.assign({}, state, { [action.payload.id]: (state[action.payload.id] || 0) + action.payload.quantity || 1 });

        case cart.ActionTypes.REMOVE_QUANTITY:
            const shouldIgnore = !state[action.payload.id];
            if (shouldIgnore) { return state; }

            const shouldRemoveItem = !action.payload.quantity
                || action.payload.quantity >= state[action.payload.id];

            return shouldRemoveItem
                ? reducer(state, new cart.RemoveItemAction({ id: action.payload.id }))
                : Object.assign({}, state, { [action.payload.id]: Math.max((state[action.payload.id] || 0) - action.payload.quantity) });

        case cart.ActionTypes.REMOVE_ITEM:
            const removeItemResult = Object.assign({}, state);
            delete removeItemResult[action.payload.id];

            return removeItemResult;

        case cart.ActionTypes.REMOVE_ALL:
            return initialState;

        default:
            return state;
    }
};
