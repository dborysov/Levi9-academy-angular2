import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';

import { IState } from '../../reducers';
import * as userActions from '../../actions/user';
import { ICredentials } from '../../models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
    constructor(private store: Store<IState>, ) { }

    register(credentials: ICredentials) {
        this.store.dispatch(new userActions.RegistrationAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
};
