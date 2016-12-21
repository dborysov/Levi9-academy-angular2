import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Config } from '../config';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';

import { IProductsService } from '../services/products';
import { ICartPosition } from '../models/cartPosition';

@Injectable()
export class ProductsEffects {
    @Effect()
    loadCart$: Observable<Action> = this.actions$
        .ofType(cart.ActionTypes.LOAD)
        .startWith(new cart.LoadAction())
        .switchMap(() => Observable.of(JSON.parse(localStorage.getItem(Config.localStorageKeyCart)))
            .map((cartItems: ICartPosition[]) => new cart.LoadSuccessAction(cartItems || [])));

    @Effect()
    loadCatalog$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.LOAD)
        .startWith(new catalog.LoadAction())
        .switchMap(() => this.productsService.getAllProducts()
            .map(products => new catalog.LoadSuccessAction(products))
            .catch(() => Observable.of(new catalog.LoadFailedAction())));

    @Effect()
    reloadCatalog$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.ADD_SUCCESS, catalog.ActionTypes.DELETE_SUCCESS)
        .map(t => new catalog.LoadAction());

    @Effect()
    deleteCatalogProduct$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.DELETE)
        .map(action => action.payload)
        .switchMap(product => this.productsService.removeProduct(product)
            .map(() => new catalog.DeleteSuccessAction(product))
            .catch(() => Observable.of(new catalog.DeleteFailedAction(product))));

    @Effect()
    addCatalogProduct$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.ADD)
        .map((action: catalog.AddAction) => action.payload)
        .switchMap(product => this.productsService.createProduct(product)
            .map(() => new catalog.AddSuccessAction(product))
            .catch(() => Observable.of(new catalog.AddFailedAction(product))));

    constructor(
        private actions$: Actions,
        @Inject(IProductsService) private productsService: IProductsService,
    ) { }
}
