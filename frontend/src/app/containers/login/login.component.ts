import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { back } from '@ngrx/router-store';

import { isEmail } from '../../validators';
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
export class LoginComponent implements OnInit {
    constructor(private store: Store<IState>, ) { }

    ngOnInit() {
    }

    login(credentials: ICredentials) {
        this.store.dispatch(new userActions.LoginAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
}
