import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProductsService } from '../../services/products.service';

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

    constructor( @Inject(IProductsService) private productsService: IProductsService) { }

    ngOnInit() { }

    createProduct() {
        this.productsService.createProduct(this.createProductForm.value);
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
