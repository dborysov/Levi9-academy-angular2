import { Injectable, OpaqueToken } from '@angular/core';
import { Store } from '@ngrx/store';

import * as cart from '../actions/cart';

import { IState } from '../reducers';
import { ICartPosition } from '../models/cartPosition';

export const ICartService = new OpaqueToken('ICartService');
export interface ICartService {
    add(cartPosition: ICartPosition): void;
    remove(cartPosition: ICartPosition): void;
    removeAll(): void;
}

@Injectable()
export class CartService implements ICartService {

    constructor(private store: Store<IState>) { }

    add(cartPosition: ICartPosition) {
        this.store.dispatch(new cart.AddQuantityAction(cartPosition));
    }
    remove(cartPosition: ICartPosition) {
        this.store.dispatch(new cart.RemoveQuantityAction(cartPosition));
    }

    removeAll() {
        this.store.dispatch(new cart.RemoveAllAction());
    }

}
