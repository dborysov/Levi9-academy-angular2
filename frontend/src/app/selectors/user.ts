import { createSelector, Selector } from 'reselect';

import * as fromUser from '../reducers/user';
import { IState } from '../reducers';

const getUserState = (state: IState) => state.user;

const getEmail = (state: fromUser.IState) => state.email;
const getToken = (state: fromUser.IState) => state.token;
const getIsSignedIn = (state: fromUser.IState) => state.isSignedIn;

export const getUserIsSignedInSelector: Selector<IState, boolean> = createSelector(getUserState, getIsSignedIn);
export const getUserEmailSelector: Selector<IState, string> = createSelector(getUserState, getEmail);
export const getUserTokenSelector: Selector<IState, string> = createSelector(getUserState, getToken);
