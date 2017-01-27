import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    @Input() products: IProduct[];
    @Output() addToCart = new EventEmitter<IProduct>();

    searchCriteria: string;

    get productsFiltered() {
        return this.products.filter(product => !this.searchCriteria || product.category.indexOf(this.searchCriteria) > -1);
    }
}
