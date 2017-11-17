import { ActionReducer } from '@ngrx/store';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';

import { ICartPositionsDetails } from '../models';

export interface IState {
  cartItems: ReadonlyArray<ICartPositionsDetails>;
}

export const initialState: IState = { cartItems: [] };

export const reducer: ActionReducer<IState> = (
  state = initialState,
  action: cart.Actions | catalog.Actions,
) => {
  switch (action.type) {
    case cart.ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        cartItems: action.payload as ReadonlyArray<ICartPositionsDetails>,
      };

    case cart.ActionTypes.LOAD_DETAILS_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          const cartItemDetails = action.payload.find(itemDetails => itemDetails.id === item.id);

          return cartItemDetails ? { ...item, ...cartItemDetails, detailsLoaded: true } : item;
        }),
      };

    case cart.ActionTypes.ADD_QUANTITY:
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      return {
        ...state,
        cartItems: existingItem
          ? state.cartItems.map(
              item =>
                item.id === action.payload.id
                  ? { ...item, quantity: (item.quantity || 0) + (action.payload.quantity || 1) }
                  : item,
            )
          : [...state.cartItems, action.payload as ICartPositionsDetails],
      };

    case cart.ActionTypes.REMOVE_QUANTITY:
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);

      if (!cartItem) {
        return state;
      }

      const shouldRemoveItem =
        !action.payload.quantity || action.payload.quantity >= cartItem.quantity;

      return shouldRemoveItem
        ? reducer(state, new cart.RemoveItemAction({ id: action.payload.id }))
        : {
            cartItems: state.cartItems.map(
              item =>
                item.id === action.payload.id
                  ? { ...item, quantity: item.quantity - action.payload.quantity }
                  : item,
            ),
          };

    case cart.ActionTypes.REMOVE_ITEM:
    case catalog.ActionTypes.DELETE_SUCCESS:
      return {
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };

    case cart.ActionTypes.REMOVE_ALL:
      return initialState;

    default:
      return state;
  }
};
