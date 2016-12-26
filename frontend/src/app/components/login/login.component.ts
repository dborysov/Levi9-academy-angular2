import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { back } from '@ngrx/router-store';

import { isEmail } from '../../validators';
import { Store } from '@ngrx/store';
import { IState } from '../../reducers';
import * as userActions from '../../actions/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private store: Store<IState>,
        fb: FormBuilder,
    ) {
        this.loginForm = fb.group({
            email: ['', [Validators.required, isEmail]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit() {
    }

    login() {
        const credentials = { email: this.loginForm.value.email, password: this.loginForm.value.password };
        this.store.dispatch(new userActions.LoginAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
}
