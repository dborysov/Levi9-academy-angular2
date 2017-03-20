import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as notification from '../actions/notification';

@Injectable()
export class NotificationsEffects {
    @Effect({ dispatch: false })
    initNotification$ = this.actions$
        .ofType(notification.ActionTypes.INIT)
        .startWith(new notification.InitAction())
        .do(() => Notification.requestPermission());

    @Effect({ dispatch: false })
    showSuccessNotification$ = this.actions$
        .ofType(notification.ActionTypes.SHOW_SUCCESS)
        .map((action: notification.ShowSuccessAction) => action.payload)
        .do(payload => {
            const notification = new Notification('Success!', { body: payload.message });
            setTimeout(() => notification.close(), 2000);
        });

    @Effect({ dispatch: false })
    showErrorNotification$ = this.actions$
        .ofType(notification.ActionTypes.SHOW_ERROR)
        .map((action: notification.ShowErrorAction) => action.payload)
        .do(payload => {
            const notification = new Notification('Error!', { body: payload.message });
            setTimeout(() => notification.close(), 2000);
        });

    constructor(
        private actions$: Actions,
    ) { }
};
