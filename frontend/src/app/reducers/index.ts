import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import * as fromProducts from './products';
import * as fromUser from './user';

export interface IState {
    products: fromProducts.IState;
    user: fromUser.IState;
    router: RouterState;
}

const reducers = {
    products: fromProducts.reducer,
    user: fromUser.reducer,
    router: routerReducer,
};

const developmentReducer: ActionReducer<IState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IState> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    return environment.production
        ? productionReducer(state, action)
        : developmentReducer(state, action);
};
