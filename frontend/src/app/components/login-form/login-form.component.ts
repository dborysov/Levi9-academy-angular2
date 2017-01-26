import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isEmail } from '../../validators';
import { ICredentials } from '../../models/credentials';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    @Output() login = new EventEmitter<ICredentials>();
    @Output() back = new EventEmitter<void>();

    loginForm: FormGroup;
    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ['', [Validators.required, isEmail]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit() {
    }
}
