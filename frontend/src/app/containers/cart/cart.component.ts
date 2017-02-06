import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IState } from '../../reducers';
import * as cartActions from '../../actions/cart';
import { getCartItemsSelector } from '../../selectors';
import { ICartPositionsDetails } from '../../models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
    public products$: Observable<ICartPositionsDetails[]>;

    constructor(private store: Store<IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select<ICartPositionsDetails[]>(getCartItemsSelector);
    }

    removeFromCart({productId, quantity}: { productId: number, quantity?: number }) {
        this.store.dispatch(new cartActions.RemoveQuantityAction({ id: productId, quantity }));
    }

    addToCart({productId, quantity}: { productId: number, quantity?: number }) {
        this.store.dispatch(new cartActions.AddQuantityAction({ id: productId, quantity }));
    }

    clearCart() {
        this.store.dispatch(new cartActions.RemoveAllAction());
    }
}
