import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { isValidPrice } from '../../validators';
import { IProduct } from '../../models';

@Component({
    selector: 'app-product-create-form',
    templateUrl: './product-create-form.component.html',
    styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent {
    public createProductForm: FormGroup;

    @Output() createProduct = new EventEmitter<IProduct>();
    @Output() back = new EventEmitter<void>();

    constructor(fb: FormBuilder, ) {
        this.createProductForm = fb.group({
            category: ['', [Validators.required, Validators.maxLength(20)]],
            title: ['', [Validators.required, Validators.maxLength(20)]],
            brand: ['', [Validators.required, Validators.maxLength(20)]],
            price: [0, [isValidPrice]],
            description: ['', [Validators.required, Validators.maxLength(1000)]],
            details: ['', [Validators.required]]
        });
    }
}
