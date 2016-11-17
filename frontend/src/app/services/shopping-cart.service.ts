import { Injectable } from '@angular/core';
import { ActionReducer, Action } from '@ngrx/store';

interface ICartItem {
  id: number;
  quantity: number;
}

export const cartStore: ActionReducer<ICartItem[]> = (state: ICartItem[], action: Action) => {
  if (state === undefined) {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    state = savedCart || [];
    localStorage.setItem('cart', JSON.stringify(state));
  }

  switch (action.type) {
    case 'ADD':
      const positionToAdd = state.find(el => el.id === action.payload.id);

      if (positionToAdd) {
        positionToAdd.quantity += action.payload.quantity;
      } else {
        state.push({ id: action.payload.id, quantity: action.payload.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state));

      return state;
    case 'REMOVE':

      const positionToDelete = state.find(el => el.id === action.payload.id);

      if (positionToDelete) {
        state.splice(state.indexOf(positionToDelete), 1);
        localStorage.setItem('cart', JSON.stringify(state));
      }

      return state;

    case 'REMOVE_ALL':
      state = [];
      localStorage.setItem('cart', JSON.stringify(state));
      return state;

    default:
      return state;
  }
}

@Injectable()
export class ShoppingCartService {

  constructor() { }

}
