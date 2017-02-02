import { ActionReducer } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import { IProduct } from '../models/product';

export interface IState {
    products: { [id: number]: IProduct };
    filterTerm: string;
}

const initialState = { products: {}, filterTerm: '' };

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
                products: Object.assign({}, state.products, { [action.payload.id]: action.payload }),
                filterTerm: state.filterTerm,
            };

        case catalog.ActionTypes.ADD_FAILED:
        case catalog.ActionTypes.DELETE_SUCCESS:
            const deleteResult = {
                products: Object.assign({}, state.products),
                filterTerm: state.filterTerm
            };
            delete deleteResult.products[action.payload.id];

            return deleteResult;

        case catalog.ActionTypes.EDIT:
            return {
                products: Object.assign({}, state.products, { [action.payload.id]: action.payload }),
                filterTerm: state.filterTerm,
            };

        case catalog.ActionTypes.DELETE_ALL:
            return { products: {}, filterTerm: state.filterTerm };

        case catalog.ActionTypes.SET_FILTER_TERM:
            return {
                products: state.products,
                filterTerm: action.payload.filterTerm,
            };

        default:
            return state;
    }
};
