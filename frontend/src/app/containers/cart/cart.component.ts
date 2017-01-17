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

    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select<ICartPositionsDetails[]>(fromRoot.getCartItemsDetails);
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
