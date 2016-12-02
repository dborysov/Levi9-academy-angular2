import { Component, Inject, OnInit } from '@angular/core';
import { FormControlDirective, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppStore } from '../../../appStore';

import { IProduct } from '../../models/product';

import { IProductsApiService } from '../../services/products-api.service';
import { ICartService } from '../../services/cart.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [FormControlDirective]
})
export class CatalogComponent implements OnInit {
    catalog: Observable<IProduct[]>;
    catalogFiltered: Observable<IProduct[]>;
    selectedItem: Observable<IProduct>;

    searchTerm: FormControl = new FormControl();

    constructor(
        private _store: Store<IAppStore>,
        @Inject(IProductsApiService) private _productsApi: IProductsApiService,
        @Inject(ICartService) private _cartService: ICartService
    ) {
        this.catalog = this._store.select<IProduct[]>('catalog');

        const searchTerm$ = (this.searchTerm.valueChanges as Observable<string>)
            .startWith('')
            .debounceTime(500)
            .distinctUntilChanged();

        this.catalogFiltered = this.catalog.combineLatest<string>(searchTerm$)
            .map(([products, searchTerm]) => products.filter(product => !searchTerm || (product.category.indexOf(searchTerm) > -1)));
    }

    addToCart(product: IProduct) {
        this._cartService.add(product);
    }

    ngOnInit() {
        this._productsApi.getAllProducts();
    }
}
