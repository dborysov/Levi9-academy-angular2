import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as selectedProduct from '../actions/selectedProduct';
import { ProductsService } from '../services';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class SelectedProductEffects {
  @Effect()
  loadSelectedProduct$: Observable<Action> = this.actions$
    .ofType<selectedProduct.SelectAction>(selectedProduct.ActionTypes.SELECT)
    .pipe(
      map((action: selectedProduct.SelectAction) => action.payload),
      switchMap(payload =>
        this.productsService
          .getProducts([payload.id])
          .pipe(
            map(products => new selectedProduct.SelectSuccessAction(products[0])),
            catchError(() => of(new selectedProduct.SelectFailedAction())),
          ),
      ),
    );

  constructor(private actions$: Actions, private productsService: ProductsService) {}
}
