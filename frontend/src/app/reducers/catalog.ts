import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';
import { IProduct } from '../models';

export interface IState {
    products: { [id: number]: IProduct };
    filterTerm: string;
}

export const initialState = { products: {}, filterTerm: '' };

export const reducer: ActionReducer<IState> = (state: IState = initialState, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.LOAD_SUCCESS:
            return action.payload.reduce(
                (newState, catalogItem) => reducer(newState, new catalog.AddSuccessAction(catalogItem)),
                initialState
            );

        case catalog.ActionTypes.ADD_SUCCESS:
        case catalog.ActionTypes.DELETE_FAILED:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.id]: action.payload
                }
            };

        case catalog.ActionTypes.ADD_FAILED:
        case catalog.ActionTypes.DELETE_SUCCESS:
            const deleteResult = {
                ...state,
                products: { ...state.products }
            };
            delete deleteResult.products[action.payload.id];

            return deleteResult;

        case catalog.ActionTypes.EDIT:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.id]: action.payload
                }
            };

        case catalog.ActionTypes.DELETE_ALL:
            return { ...state, products: {} };

        case catalog.ActionTypes.SET_FILTER_TERM:
            return {
                ...state,
                filterTerm: action.payload.filterTerm,
            };

        default:
            return state;
    }
};
