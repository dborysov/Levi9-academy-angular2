import { Config } from '../config';

import { ActionReducer, Action } from '@ngrx/store';

import { IState } from '../reducers/cart';

export function reducer(reducer: ActionReducer<IState>) {
    return function (state: IState, action: Action) {
        const nextState = reducer(state, action);

        if (nextState.quantity !== state.quantity) {
            localStorage.setItem(
                Config.localStorageKeyCart,
                JSON.stringify(Object.keys(nextState.quantity).map(key => ({ id: key, quantity: nextState.quantity[key] }))));
        }

        return nextState;
    };
}
