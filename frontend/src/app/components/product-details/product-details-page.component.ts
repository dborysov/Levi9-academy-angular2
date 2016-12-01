import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable , Subscription} from 'rxjs';

import { Store } from '@ngrx/store';

import { IAppStore } from '../../../appStore';
import { IProduct } from '../../models/product';
import { IProductsApiService } from '../../services/products-api.service';

@Component({
    selector: 'app-product-details-page',
    templateUrl: './product-details-page.component.html',
    styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
    private product: Observable<IProduct>;
    private paramsSubscription: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<IAppStore>,
        @Inject(IProductsApiService) private _productsService: IProductsApiService
    ) {
        this.product = _store.select<IProduct>('selectedProduct');
    }

    ngOnInit() {
        this.paramsSubscription = this._route.params.subscribe((params: Params) => this._productsService.selectItem(+params['id']))
    }

    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }
}
