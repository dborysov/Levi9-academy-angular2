import { ActionReducer } from '@ngrx/store';

import * as selectedProduct from '../actions/selectedProduct';

export interface IState {
    id: number;
}

export const reducer: ActionReducer<IState> = (state: IState = null, action: selectedProduct.Actions) => {
    switch (action.type) {
        case selectedProduct.ActionTypes.SELECT:
            return { id: action.payload.id };

        default:
            return state;
    }
};
