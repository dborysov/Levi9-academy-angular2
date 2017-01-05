import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';

import { IState } from '../../reducers';
import * as userActions from '../../actions/user';
import { isEmail, areEqual } from '../../validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private store: Store<IState>,
        fb: FormBuilder,
    ) {
        this.registerForm = fb.group({
            email: ['', [Validators.required, isEmail]],
            matchingPasswords: fb.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                repeatPassword: ['', [Validators.required]]
            }, { validator: areEqual })
        });
    }

    ngOnInit() {
    }

    register() {
        const credentials = { email: this.registerForm.value.email, password: this.registerForm.value.matchingPasswords.password };
        this.store.dispatch(new userActions.RegistrationAction(credentials));
    }

    back() {
        this.store.dispatch(back());
    }
};
