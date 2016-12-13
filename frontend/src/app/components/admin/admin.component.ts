import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../reducers';

import { IProduct } from '../../models/product';
import { IProductsService } from '../../services/products.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public products$: Observable<IProduct[]>;

    constructor(
        private store: Store<fromRoot.IState>,
        @Inject(IProductsService) private productsService: IProductsService,
    ) { }

    ngOnInit() {
        this.products$ = this.store.select(fromRoot.getCatalogItems);
        this.productsService.getAllProducts();
    }

    removeProduct(id: number) {
        this.productsService.removeProduct(id);
    }
}
