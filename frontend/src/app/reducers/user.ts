import { ActionReducer } from '@ngrx/store';
import * as user from '../actions/user';

export interface IState {
    email: string;
    token: string;
    isSignedIn: boolean;
}

const initialState: IState = { email: null, isSignedIn: false, token: null };

export const reducer: ActionReducer<IState> = (state = initialState, action: user.Actions) => {
    switch (action.type) {
        case user.ActionTypes.LOGIN_SUCCESS:
        case user.ActionTypes.LOAD_CURRENT_SUCCESS:
        case user.ActionTypes.REGISTRATION_SUCCESS:
            return { ...state, isSignedIn: true, email: action.payload.email, token: action.payload.token };

        case user.ActionTypes.LOGIN_FAILED:
        case user.ActionTypes.REGISTRATION_FAILED:
        case user.ActionTypes.LOAD_CURRENT_FAILED:
        case user.ActionTypes.LOGOUT_SUCCESS:
            return { ...initialState };

        default:
            return state;
    }
};
