import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as notificationActions from '../actions/notification';

@Injectable()
export class NotificationsEffects {
  @Effect({ dispatch: false })
  initNotification$ = this.actions$
    .ofType<notificationActions.InitAction>(notificationActions.ActionTypes.INIT)
    .startWith(new notificationActions.InitAction())
    .do(() => Notification.requestPermission());

  @Effect({ dispatch: false })
  showSuccessNotification$ = this.actions$
    .ofType(notificationActions.ActionTypes.SHOW_SUCCESS)
    .map((action: notificationActions.ShowSuccessAction) => action.payload)
    .do(payload => {
      const notification = new Notification('Success!', { body: payload.message });
      setTimeout(() => notification.close(), 2000);
    });

  @Effect({ dispatch: false })
  showErrorNotification$ = this.actions$
    .ofType(notificationActions.ActionTypes.SHOW_ERROR)
    .map((action: notificationActions.ShowErrorAction) => action.payload)
    .do(payload => {
      const notification = new Notification('Error!', { body: payload.message });
      setTimeout(() => notification.close(), 2000);
    });

  constructor(private actions$: Actions) {}
}
