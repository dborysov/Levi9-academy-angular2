import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppStore } from '../../../appStore';

import { IProduct } from '../../models/product';
import { IProductsApiService } from '../../services/products-api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    products: Observable<IProduct[]>;

    constructor(
        @Inject(IProductsApiService) private _productsService: IProductsApiService,
        private _store: Store<IAppStore>
    ) {
        this.products = _store.select<IProduct[]>('catalog');

        this._productsService.getAllProducts();
    }

    ngOnInit() {
    }

    removeProduct(id: number) {
        this._productsService.removeProduct(id);
    }
}
