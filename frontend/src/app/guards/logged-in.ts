import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { getUserIsSignedInSelector } from '../selectors';
import * as fromRoot from '../reducers';

@Injectable()
export class LoggedInGuard implements CanActivate {
    private readonly isSignedIn$: Observable<boolean>;

    constructor(private store: Store<fromRoot.IState>, ) {
        this.isSignedIn$ = this.store.select(getUserIsSignedInSelector);
    }

    canActivate() { return this.isSignedIn$; }
}
