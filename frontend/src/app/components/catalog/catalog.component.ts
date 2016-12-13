import { Component, Inject, OnInit } from '@angular/core';
import { FormControlDirective, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';

import { IProduct } from '../../models/product';

import { IProductsService } from '../../services/products.service';
import { ICartService } from '../../services/cart.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [FormControlDirective]
})
export class CatalogComponent implements OnInit {
    public catalog$: Observable<IProduct[]>;
    public catalogFiltered$: Observable<IProduct[]>;
    public selectedItem$: Observable<IProduct>;

    searchTerm: FormControl = new FormControl();

    constructor(
        private store: Store<fromRoot.IState>,
        @Inject(IProductsService) private productsApi: IProductsService,
        @Inject(ICartService) private cartService: ICartService
    ) { }

    ngOnInit() {
        this.catalog$ = this.store.select<IProduct[]>(fromRoot.getCatalogItems);

        const searchTerm$ = (this.searchTerm.valueChanges as Observable<string>)
            .startWith('')
            .debounceTime(500)
            .distinctUntilChanged();

        this.catalogFiltered$ = this.catalog$.combineLatest<string>(searchTerm$)
            .map(([products, searchTerm]) => products.filter(product => !searchTerm || (product.category.indexOf(searchTerm) > -1)));

        this.productsApi.getAllProducts();
    }

    addToCart(product: IProduct) {
        this.cartService.add({ id: product.id, quantity: 1 });
    }
}
