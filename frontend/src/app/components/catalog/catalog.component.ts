import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppStore } from '../../../appStore';

import { IProduct } from '../../models/product';

import { IProductsApiService } from '../../services/products-api.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
    catalog: Observable<IProduct[]>;
    selectedItem: Observable<IProduct>;
    constructor(
        private _store: Store<IAppStore>,
        @Inject(IProductsApiService) private _productsApi: IProductsApiService
    ) {
        this.catalog = this._store.select<IProduct[]>('catalog');

        _productsApi.getAllProducts();
    }
}
