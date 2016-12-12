import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { back } from '@ngrx/router-store';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { IProduct } from '../../models/product';
import { IProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-details-page',
    templateUrl: './product-details-page.component.html',
    styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
    private product$: Observable<IProduct>;
    private paramsSubscription: Subscription;

    constructor(
        private store: Store<fromRoot.IState>,
        private route: ActivatedRoute,
        @Inject(IProductsService) private productsService: IProductsService,
    ) { }

    ngOnInit() {
        this.product$ = this.store.select<IProduct>(fromRoot.getSelectedProduct);
        this.paramsSubscription = this.route.params.subscribe((params: Params) => this.productsService.selectItem(+params['id']));
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    back() {
        this.store.dispatch(back());
    }
}
