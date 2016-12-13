import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export interface IState {
    [id: number]: IProduct;
}

export const reducer: ActionReducer<IState> = (state: IState = null, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.LOAD_SUCCESS:
            return action.payload.reduce((newState, catalogItem) => reducer(newState, new catalog.AddSuccessAction(catalogItem)), {});

        case catalog.ActionTypes.ADD_SUCCESS:
        case catalog.ActionTypes.DELETE_FAILED:
            return Object.assign({}, state, { [action.payload.id]: action.payload });

        case catalog.ActionTypes.ADD_FAILED:
        case catalog.ActionTypes.DELETE_SUCCESS:
            const deleteResult = Object.assign({}, state);
            delete deleteResult[action.payload.id];

            return deleteResult;

        case catalog.ActionTypes.EDIT:
            return Object.assign({}, state, { [action.payload.id]: action.payload });

        case catalog.ActionTypes.DELETE_ALL:
            return {};

        default:
            return state;
    }
};
