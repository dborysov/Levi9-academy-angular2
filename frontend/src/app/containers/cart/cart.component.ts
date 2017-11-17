import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IState } from '../../reducers';
import * as cartActions from '../../actions/cart';
import { getLoadedCartItemsSelector } from '../../selectors';
import { ICartPositionsDetails } from '../../models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
    public products$: Observable<ReadonlyArray<ICartPositionsDetails>>;

    constructor(private store: Store<IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select<ReadonlyArray<ICartPositionsDetails>>(getLoadedCartItemsSelector);
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
