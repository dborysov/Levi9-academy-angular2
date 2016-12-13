import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { back } from '@ngrx/router-store';

import * as fromRoot from '../../reducers';
import * as catalogActions from '../../actions/catalog';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
    createProductForm = new FormGroup({
        category: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        brand: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        price: new FormControl(0, [validatePrice]),
        description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
        details: new FormControl('', [Validators.required])
    });

    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() { }

    createProduct() {
        this.store.dispatch(new catalogActions.AddAction(this.createProductForm.value));
    }

    back() {
        this.store.dispatch(back());
    }
}

function validatePrice(control: FormControl) {
    return parseInt(control.value, 10) >= 0 && parseInt(control.value, 10) <= 100000
        ? null
        : {
            validatePrice: {
                valid: false
            }
        };
}
