import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppStore } from '../../../appStore';
import { ICartService } from '../../services/cart.service';
import { ICartPosition } from '../../models/cartPosition';

import { } from '../../services/';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products: Observable<ICartPosition[]>;
    totalPrice$: Observable<number>;

    constructor(
        @Inject(ICartService) private _cartService: ICartService,
        private _store: Store<IAppStore>
    ) {
        this.products = this._store.select<ICartPosition[]>('cart');
        this.totalPrice$ = this.products.map(positions => positions.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
    }

    ngOnInit() {
    }

    removeFromCart(product: ICartPosition, quantity?: number) {
        this._cartService.remove(product, quantity);
    }

    addToCart(product: ICartPosition, quantity?: number) {
        this._cartService.add(product, quantity);
    }

    clearCart() {
        this._cartService.removeAll();
    }

}
