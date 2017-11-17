import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as notificationActions from '../actions/notification';
import { startWith, tap, map } from 'rxjs/operators';

@Injectable()
export class NotificationsEffects {
  @Effect({ dispatch: false })
  initNotification$ = this.actions$
    .ofType<notificationActions.InitAction>(notificationActions.ActionTypes.INIT)
    .pipe(
      startWith(new notificationActions.InitAction()),
      tap(() => Notification.requestPermission),
    );

  @Effect({ dispatch: false })
  showSuccessNotification$ = this.actions$
    .ofType<notificationActions.ShowSuccessAction>(notificationActions.ActionTypes.SHOW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(payload => {
        const notification = new Notification('Success!', { body: payload.message });
        setTimeout(() => notification.close(), 2000);
      }),
    );

  @Effect({ dispatch: false })
  showErrorNotification$ = this.actions$
    .ofType<notificationActions.ShowErrorAction>(notificationActions.ActionTypes.SHOW_ERROR)
    .pipe(
      map(action => action.payload),
      tap(payload => {
        const notification = new Notification('Error!', { body: payload.message });
        setTimeout(() => notification.close(), 2000);
      }),
    );

  constructor(private actions$: Actions) {}
}
