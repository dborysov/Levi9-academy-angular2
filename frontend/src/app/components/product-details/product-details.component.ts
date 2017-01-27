import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IProduct } from '../../models/product';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
    @Input() product: IProduct;
    @Output() back = new EventEmitter<void>();
}
