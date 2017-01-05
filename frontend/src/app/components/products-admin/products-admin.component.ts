import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
    selector: 'app-products-admin',
    templateUrl: './products-admin.component.html',
    styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent {

    @Input() products: IProduct[];
    @Output() remove = new EventEmitter<IProduct>();
    constructor() { }
}
