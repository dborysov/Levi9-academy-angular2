import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';

@Injectable()
export class LoggedInGuard implements CanActivate {
    private readonly isSignedIn$: Observable<boolean>;

    constructor(
        private store: Store<fromRoot.IState>
    ) {
        this.isSignedIn$ = this.store.select(fromRoot.getUserIsSignedIn);
    }

    canActivate() { return this.isSignedIn$; }
}
