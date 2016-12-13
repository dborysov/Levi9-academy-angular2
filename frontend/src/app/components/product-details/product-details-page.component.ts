import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { back } from '@ngrx/router-store';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as selectedProductActions from '../../actions/selectedProduct';
import { IProduct } from '../../models/product';

@Component({
    selector: 'app-product-details-page',
    templateUrl: './product-details-page.component.html',
    styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
    public product$: Observable<IProduct>;
    public paramsSubscription: Subscription;

    constructor(
        private store: Store<fromRoot.IState>,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.product$ = this.store.select<IProduct>(fromRoot.getSelectedProduct);
        this.paramsSubscription = this.route.params
            .map(params => +params['id'])
            .subscribe(id => this.store.dispatch(new selectedProductActions.SelectAction({ id })));
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    back() {
        this.store.dispatch(back());
    }
}
