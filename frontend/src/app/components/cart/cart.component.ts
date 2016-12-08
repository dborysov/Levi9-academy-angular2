import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { ICartService } from '../../services/cart.service';
import { ICartPosition } from '../../models/cartPosition';

import { } from '../../services/';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products$: Observable<ICartPosition[]>;
    totalPrice$: Observable<number>;

    constructor(
        private store: Store<fromRoot.IState>,
        @Inject(ICartService) private cartService: ICartService,
    ) { }

    ngOnInit() {
        this.products$ = this.store.select<ICartPosition[]>(fromRoot.getCartItems);
        this.totalPrice$ = this.products$.map(positions => positions.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
    }

    removeFromCart(product: ICartPosition, quantity?: number) {
        this.cartService.remove(product, quantity);
    }

    addToCart(product: ICartPosition, quantity?: number) {
        this.cartService.add(product, quantity);
    }

    clearCart() {
        this.cartService.removeAll();
    }
}
