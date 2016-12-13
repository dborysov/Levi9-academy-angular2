import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { ICartService } from '../../services/cart.service';
import { IProduct } from '../../models/product';
import { ICartPositionsDetails } from '../../models/cartPositionsDetails';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    public products$: Observable<ICartPositionsDetails[]>;
    public totalPrice$: Observable<number>;

    constructor(
        private store: Store<fromRoot.IState>,
        @Inject(ICartService) private cartService: ICartService,
    ) { }

    ngOnInit() {
        this.products$ = this.store.select<ICartPositionsDetails[]>(fromRoot.getCartItemsDetails);
        this.totalPrice$ = this.products$.map(positions => positions.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
    }

    removeFromCart(product: IProduct, quantity?: number) {
        this.cartService.remove({id: product.id, quantity});
    }

    addToCart(product: IProduct, quantity: number) {
        this.cartService.add({id: product.id, quantity});
    }

    clearCart() {
        this.cartService.removeAll();
    }
}
