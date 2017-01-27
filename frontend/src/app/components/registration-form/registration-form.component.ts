import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { areEqual, isEmail } from '../../validators';
import { ICredentials } from '../../models/credentials';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
    @Output() back = new EventEmitter<void>();
    @Output() register = new EventEmitter<ICredentials>();
    registerForm: FormGroup;

    constructor(fb: FormBuilder, ) {
        this.registerForm = fb.group({
            email: ['', [Validators.required, isEmail]],
            matchingPasswords: fb.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                repeatPassword: ['', [Validators.required]]
            }, { validator: areEqual })
        });
    }
}
