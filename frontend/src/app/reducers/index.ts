import * as fromRouter from '@ngrx/router-store';

import * as fromProducts from './products';
import * as fromUser from './user';
import { MetaReducer } from '@ngrx/store';

export interface IState {
  products: fromProducts.IState;
  user: fromUser.IState;
  router: fromRouter.RouterReducerState;
}

export const reducers = {
  products: fromProducts.reducer,
  user: fromUser.reducer,
  router: fromRouter.routerReducer,
};

export const metaReducers: ReadonlyArray<MetaReducer<IState>> = [];
