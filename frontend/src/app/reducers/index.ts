import * as fromRouter from '@ngrx/router-store';

import * as fromProducts from './products';
import * as fromUser from './user';
import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

export interface IState {
  products: fromProducts.IState;
  user: fromUser.IState;
  router: fromRouter.RouterReducerState;
}

export const reducerToken = new InjectionToken<ActionReducerMap<IState>>('Reducers');

export const getReducers = () => ({
  products: fromProducts.reducer,
  user: fromUser.reducer,
  router: fromRouter.routerReducer,
});

export const reducerProvider = [{ provide: reducerToken, useFactory: getReducers }];
