import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Config } from '../config';
import * as cart from '../actions/cart';
import * as catalog from '../actions/catalog';
import * as notification from '../actions/notification';
import {
  getUserTokenSelector,
  getLoadedCartItemsSelector,
  getCartItemsSelector,
} from '../selectors';
import { IState } from '../reducers';
import { ProductsService } from '../services/products';
import { ICartPosition } from '../models';

import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import {
  map,
  filter,
  switchMap,
  withLatestFrom,
  distinctUntilChanged,
  catchError,
  tap,
} from 'rxjs/operators';
@Injectable()
export class ProductsEffects {
  @Effect()
  loadCartDetails$ = this.actions$
    .ofType<cart.LoadDetailsAction | cart.LoadSuccessAction>(
      cart.ActionTypes.LOAD_DETAILS,
      cart.ActionTypes.LOAD_SUCCESS,
    )
    .pipe(
      map(action => action.payload),
      filter(payload => !!payload.length),
      switchMap(payload =>
        this.productsService
          .getProducts(payload.map(item => item.id))
          .pipe(
            map(products => new cart.LoadDetailsSuccessAction(products)),
            catchError(() => of(new cart.LoadDetailsFailedAction())),
          ),
      ),
    );

  @Effect()
  loadCart$ = defer(() => {
    const cartItems: ReadonlyArray<ICartPosition> = JSON.parse(localStorage.getItem(Config.localStorageKeyCart));

    return of(new cart.LoadSuccessAction(cartItems || []));
  });

  @Effect()
  addItemToCart$ = this.actions$
    .ofType(cart.ActionTypes.ADD_QUANTITY)
    .pipe(
      map((action: cart.AddQuantityAction) => action.payload),
      withLatestFrom(this.store.select(getLoadedCartItemsSelector)),
      filter(([payload, savedPositions]) => savedPositions.every(p => p.id !== payload.id)),
      distinctUntilChanged(),
      map(([payload]) => new cart.LoadDetailsAction([payload])),
    );

  @Effect({ dispatch: false })
  saveCart$ = this.store.select(getCartItemsSelector).pipe(
    tap(cartItemsIds => {
      localStorage.setItem(Config.localStorageKeyCart, JSON.stringify(cartItemsIds));
    }),
  );

  @Effect()
  loadCatalog$ = this.actions$
    .ofType(catalog.ActionTypes.LOAD)
    .pipe(
      switchMap(() =>
        this.productsService
          .getProducts()
          .pipe(
            map(products => new catalog.LoadSuccessAction(products)),
            catchError(() => of(new catalog.LoadFailedAction())),
          ),
      ),
    );

  @Effect()
  reloadCatalog$ = this.actions$
    .ofType(catalog.ActionTypes.ADD_SUCCESS, catalog.ActionTypes.DELETE_SUCCESS)
    .pipe(map(() => new catalog.LoadAction()));

  @Effect()
  showSuccessOnCreate$ = this.actions$.ofType(catalog.ActionTypes.ADD_SUCCESS).pipe(
    map(
      (action: catalog.AddSuccessAction) =>
        new notification.ShowSuccessAction({
          message: `Position ${action.payload.title} created`,
        }),
    ),
  );

  @Effect()
  showSuccessOnDelete$ = this.actions$.ofType(catalog.ActionTypes.DELETE_SUCCESS).pipe(
    map(
      (action: catalog.AddSuccessAction) =>
        new notification.ShowSuccessAction({
          message: `Position ${action.payload.title} deleted`,
        }),
    ),
  );

  @Effect()
  deleteCatalogProduct$ = this.actions$
    .ofType<catalog.DeleteAction>(catalog.ActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      withLatestFrom(this.store.select(getUserTokenSelector)),
      switchMap(([product, token]) =>
        this.productsService
          .removeProduct(product, token)
          .pipe(
            map(() => new catalog.DeleteSuccessAction(product)),
            catchError(() => of(new catalog.DeleteFailedAction(product))),
          ),
      ),
    );

  @Effect()
  addCatalogProduct$ = this.actions$
    .ofType(catalog.ActionTypes.ADD)
    .pipe(
      map((action: catalog.AddAction) => action.payload),
      withLatestFrom(this.store.select(getUserTokenSelector)),
      switchMap(([product, token]) =>
        this.productsService
          .createProduct(product, token)
          .pipe(
            map(() => new catalog.AddSuccessAction(product)),
            catchError(() => of(new catalog.AddFailedAction(product))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private productsService: ProductsService,
  ) {}
}
