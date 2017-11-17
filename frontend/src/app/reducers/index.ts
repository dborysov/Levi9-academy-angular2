import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import * as fromProducts from './products';
import * as fromUser from './user';
import { MetaReducer } from '@ngrx/store/src/models';

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

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [storeFreeze] : [];
