import { Config } from '../config';

import { ActionReducer, Action } from '@ngrx/store';

export function saveToLocalStorageMetaReducer<T>(reducer: ActionReducer<T>) {
    return function (state: T, action: Action) {
        const nextState = reducer(state, action);

        localStorage.setItem(Config.localStorageKeyChart, JSON.stringify(nextState));

        return nextState;
    };
}
