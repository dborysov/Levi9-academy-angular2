// import { Config } from '../config';

import { ActionReducer, Action } from '@ngrx/store';

import { IState } from './cart';

export function reducer(reducer: ActionReducer<IState>) {
    return function (state: IState, action: Action) {
        const nextState = reducer(state, action);

        // localStorage.setItem(Config.localStorageKeyChart, JSON.stringify(nextState.products));

        return nextState;
    };
}
