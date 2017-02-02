import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../reducers';
import { Config } from '../config';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';
import { IState, getUserToken, getCartItemsDetails } from '../reducers';

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
    loadCartDetails$: Observable<Action> = this.actions$
        .ofType(cart.ActionTypes.LOAD_DETAILS, cart.ActionTypes.LOAD_SUCCESS)
        .map((action: cart.LoadDetailsAction | cart.LoadSuccessAction) => action.payload)
        .filter(payload => payload.length > 0)
        .switchMap(payload => this.productsService.getProducts(payload.map(item => item.id))
            .map(products => new cart.LoadDetailsSuccessAction(products))
            .catch(() => Observable.of(new cart.LoadDetailsFailedAction())));

    @Effect()
    addItemToCart$: Observable<Action> = this.actions$
        .ofType(cart.ActionTypes.ADD_QUANTITY)
        .map((action: cart.AddQuantityAction) => action.payload)
        .withLatestFrom(this.store.select(getCartItemsDetails))
        .filter(([payload, savedPositions]) => savedPositions.every(p => p.id !== payload.id))
        .distinctUntilChanged()
        .map(([payload]) => new cart.LoadDetailsAction([payload]));

    @Effect()
    loadCatalog$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.LOAD)
        .switchMap(() => this.productsService.getProducts()
            .map(products => new catalog.LoadSuccessAction(products))
            .catch(() => Observable.of(new catalog.LoadFailedAction())));

    @Effect()
    reloadCatalog$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.ADD_SUCCESS, catalog.ActionTypes.DELETE_SUCCESS)
        .map(() => new catalog.LoadAction());

    @Effect()
    deleteCatalogProduct$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.DELETE)
        .map(action => action.payload)
        .combineLatest(this.store.select(getUserToken))
        .switchMap(([product, token]) => this.productsService.removeProduct(product, token)
            .map(() => new catalog.DeleteSuccessAction(product))
            .catch(() => Observable.of(new catalog.DeleteFailedAction(product))));

    @Effect()
    addCatalogProduct$: Observable<Action> = this.actions$
        .ofType(catalog.ActionTypes.ADD)
        .map((action: catalog.AddAction) => action.payload)
        .combineLatest(this.store.select(getUserToken))
        .switchMap(([product, token]) => this.productsService.createProduct(product, token)
            .map(() => new catalog.AddSuccessAction(product))
            .catch(() => Observable.of(new catalog.AddFailedAction(product))));

    constructor(
        private actions$: Actions,
        private store: Store<IState>,
        @Inject(IProductsService) private productsService: IProductsService,
    ) { }
}
