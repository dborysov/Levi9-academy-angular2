import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Config } from '../config';
import * as cart from '../actions/cart';

import { ICartPosition } from '../models/cartPosition';

@Injectable()
export class ProductsEffects {
    @Effect()
    loadCart$: Observable<Action> = this.actions$
        .ofType(cart.ActionTypes.LOAD)
        .startWith(new cart.LoadAction())
        .switchMap(value => Observable.of(JSON.parse(localStorage.getItem(Config.localStorageKeyChart)))
            .map((cartItems: ICartPosition[]) => new cart.LoadSuccessAction(cartItems)));

    constructor(
        private actions$: Actions
    ) { }
}
