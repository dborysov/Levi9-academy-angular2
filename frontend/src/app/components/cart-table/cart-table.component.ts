import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICartPositionsDetails } from '../../models/cartPositionsDetails';
import { IProduct } from '../../models/product';

@Component({
    selector: 'app-cart-table',
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
    @Input() products: ICartPositionsDetails[];
    @Output() removeFromCart = new EventEmitter<{ productId: number, quantity?: number }>();
    @Output() addToCart = new EventEmitter<{ productId: number, quantity: number }>();
    @Output() clearCart = new EventEmitter<void>();

    get totalPrice() { return this.products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0); }
    constructor() { }

    ngOnInit() {
    }

}
