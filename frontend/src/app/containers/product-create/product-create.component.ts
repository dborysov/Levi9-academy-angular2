import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { back } from '@ngrx/router-store';

import { isValidPrice } from '../../validators';

import * as fromRoot from '../../reducers';
import * as catalogActions from '../../actions/catalog';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit {
    public createProductForm: FormGroup;

    constructor(
        private store: Store<fromRoot.IState>,
        private fb: FormBuilder,
    ) {
        this.createProductForm = fb.group({
            category: ['', [Validators.required, Validators.maxLength(20)]],
            title: ['', [Validators.required, Validators.maxLength(20)]],
            brand: ['', [Validators.required, Validators.maxLength(20)]],
            price: [0, [isValidPrice]],
            description: ['', [Validators.required, Validators.maxLength(1000)]],
            details: ['', [Validators.required]]
        });
    }

    ngOnInit() { }

    createProduct() {
        this.store.dispatch(new catalogActions.AddAction(this.createProductForm.value));
    }

    back() {
        this.store.dispatch(back());
    }
}
