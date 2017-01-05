import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as cartActions from '../../actions/cart';

import { IProduct } from '../../models/product';
import { ICartPositionsDetails } from '../../models/cartPositionsDetails';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
    public products$: Observable<ICartPositionsDetails[]>;
    public totalPrice$: Observable<number>;

    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select<ICartPositionsDetails[]>(fromRoot.getCartItemsDetails);
        this.totalPrice$ = this.products$.map(positions => positions.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
    }

    removeFromCart(product: IProduct, quantity?: number) {
        this.store.dispatch(new cartActions.RemoveQuantityAction({ id: product.id, quantity }));
    }

    addToCart(product: IProduct, quantity: number) {
        this.store.dispatch(new cartActions.AddQuantityAction({ id: product.id, quantity }));
    }

    clearCart() {
        this.store.dispatch(new cartActions.RemoveAllAction());
    }
}
