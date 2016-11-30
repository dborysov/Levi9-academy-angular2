import { Config } from '../config';

import { ActionReducer, Action } from '@ngrx/store';

import { IProduct } from '../models/product';

export function saveToLocalStorageMetaReducer(reducer: ActionReducer<IProduct[]>) {
    return function (state: IProduct[], action: Action) {
        const nextState = reducer(state, action);

        localStorage.setItem(Config.localStorageKeyChart, JSON.stringify(nextState));

        return nextState;
    };
}
