import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';
import { IProduct } from '../models';

export interface IState {
    products: IProduct[];
    filterTerm: string;
}

export const initialState: IState = { products: [], filterTerm: '' };

export const reducer: ActionReducer<IState> = (state = initialState, action: catalog.Actions) => {
    switch (action.type) {
        case catalog.ActionTypes.LOAD_SUCCESS:
            return {
                ...state,
                products: action.payload
            };

        case catalog.ActionTypes.ADD:
        case catalog.ActionTypes.DELETE_FAILED:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            };

        case catalog.ActionTypes.DELETE:
        case catalog.ActionTypes.ADD_FAILED:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id)
            };

        case catalog.ActionTypes.EDIT:
            return {
                ...state,
                products: state.products.map(product => product.id !== action.payload.id ? product : action.payload)
            };

        case catalog.ActionTypes.DELETE_ALL:
            return initialState;

        case catalog.ActionTypes.SET_FILTER_TERM:
            return {
                ...state,
                filterTerm: action.payload.filterTerm,
            };

        default:
            return state;
    }
};
