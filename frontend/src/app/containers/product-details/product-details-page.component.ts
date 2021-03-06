import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { getSelectedProductSelector } from '../../selectors';
import { IState } from '../../reducers';
import * as selectedProductActions from '../../actions/selectedProduct';
import * as routerActions from '../../actions/router';
import { IProduct } from '../../models';

@Component({
    selector: 'app-product-details-page',
    templateUrl: './product-details-page.component.html',
    styleUrls: ['./product-details-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsPageComponent implements OnInit {
    public product$: Observable<IProduct>;

    constructor(
        private store: Store<IState>,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.product$ = this.store.select<IProduct>(getSelectedProductSelector);
        this.store.dispatch(new selectedProductActions.SelectAction({ id: +this.route.snapshot.params['id'] }));
    }

    back() {
        this.store.dispatch(new routerActions.Back());
    }
}
