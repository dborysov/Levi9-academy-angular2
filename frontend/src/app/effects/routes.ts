import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from '../actions/router';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(RouterActions.ActionTypes.GO)
    .pipe(
      map((action: RouterActions.Go) => action.payload),
      tap(({ path, query: queryParams, extras }) =>
        this.router.navigate([...path], { queryParams, ...extras }),
      ),
    );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.ActionTypes.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.ActionTypes.FORWARD)
    .pipe(tap(() => this.location.forward()));

  constructor(private actions$: Actions, private router: Router, private location: Location) {}
}