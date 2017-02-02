import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { back } from '@ngrx/router-store';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as selectedProductActions from '../../actions/selectedProduct';
import { IProduct } from '../../models/product';

@Component({
    selector: 'app-product-details-page',
    templateUrl: './product-details-page.component.html',
    styleUrls: ['./product-details-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsPageComponent implements OnInit {
    public product$: Observable<IProduct>;

    constructor(
        private store: Store<fromRoot.IState>,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.product$ = this.store.select<IProduct>(fromRoot.getSelectedProduct);
        this.store.dispatch(new selectedProductActions.SelectAction({ id: +this.route.snapshot.params['id'] }));
    }

    back() {
        this.store.dispatch(back());
    }
}
