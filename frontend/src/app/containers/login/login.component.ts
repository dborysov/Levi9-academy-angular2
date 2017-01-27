import { Component, ChangeDetectionStrategy } from '@angular/core';
import { back } from '@ngrx/router-store';

import { Store } from '@ngrx/store';
import { IState } from '../../reducers';
import * as userActions from '../../actions/user';
import { ICredentials } from '../../models/credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    constructor(private store: Store<IState>, ) { }

    login(credentials: ICredentials) {
        this.store.dispatch(new userActions.LoginAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
}
