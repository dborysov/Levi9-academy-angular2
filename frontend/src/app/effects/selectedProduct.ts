import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as selectedProduct from '../actions/selectedProduct';
import { ProductsService } from '../services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class SelectedProductEffects {
    @Effect()
    loadSelectedProduct$: Observable<Action> = this.actions$
        .ofType(selectedProduct.ActionTypes.SELECT)
        .map((action: selectedProduct.SelectAction) => action.payload)
        .switchMap(payload => this.productsService.getProducts([payload.id])
            .map(products => new selectedProduct.SelectSuccessAction(products[0]))
            .catch(() => Observable.of(new selectedProduct.SelectFailedAction())));

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
    ) { }
}
