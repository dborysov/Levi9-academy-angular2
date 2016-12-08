import { Injectable, OpaqueToken } from '@angular/core';
import { Store } from '@ngrx/store';

import * as cart from '../actions/cart';

import { IAppStore } from '../../appStore';
import { IProduct } from '../models/product';
import { ICartPosition } from '../models/cartPosition';

export const ICartService = new OpaqueToken('ICartService');
export interface ICartService {
    add(product: IProduct, quantity?: number): void;
    remove(product: IProduct, quantity?: number): void;
    removeAll(): void;
}

@Injectable()
export class CartService implements ICartService {

    constructor(
        private _store: Store<IAppStore>
    ) { }

    add(product: IProduct, quantity = 1) {
        const cartItem = Object.assign({}, product, { quantity }) as ICartPosition;
        this._store.dispatch(new cart.AddQuantityAction(cartItem));
    }
    remove(product: IProduct, quantity?: number) {
        const cartItem = Object.assign({}, product, { quantity }) as ICartPosition;
        this._store.dispatch(new cart.RemoveQuantityAction(cartItem));
    }

    removeAll() {
        this._store.dispatch(new cart.RemoveAllAction());
    }

}