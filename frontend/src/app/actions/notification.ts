import { Action } from '@ngrx/store';
import { type } from '../util';

export class ActionTypes {
    static readonly INIT = type('[Notification] Init');
    static readonly SHOW_SUCCESS = type('[Notification] Show Success');
    static readonly SHOW_ERROR = type('[Notification] Show Error');
}

export class InitAction implements Action {
    readonly type = ActionTypes.INIT;
}

export class ShowSuccessAction implements Action {
    readonly type = ActionTypes.SHOW_SUCCESS;

    constructor(public readonly payload: { message: string }) { };
}

export class ShowErrorAction implements Action {
    readonly type = ActionTypes.SHOW_ERROR;

    constructor(public readonly payload: { message: string }) { };
}