import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';

import { IState } from '../../reducers';
import * as userActions from '../../actions/user';
import { ICredentials } from '../../models/credentials';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    constructor(private store: Store<IState>, ) { }

    ngOnInit() { }

    register(credentials: ICredentials) {
        this.store.dispatch(new userActions.RegistrationAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
};
