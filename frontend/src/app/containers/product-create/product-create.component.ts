import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';

import { IProduct } from '../../models/product';

import * as fromRoot from '../../reducers';
import * as catalogActions from '../../actions/catalog';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit {
    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() { }

    createProduct(product: IProduct) {
        this.store.dispatch(new catalogActions.AddAction(product));
    }

    back() {
        this.store.dispatch(back());
    }
}
