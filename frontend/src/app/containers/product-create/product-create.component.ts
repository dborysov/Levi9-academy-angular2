import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { back } from '@ngrx/router-store';

import { IProduct } from '../../models';
import { IState } from '../../reducers';
import * as catalogActions from '../../actions/catalog';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent {
    constructor(private store: Store<IState>, ) { }

    createProduct(product: IProduct) {
        this.store.dispatch(new catalogActions.AddAction(product));
    }

    back() {
        this.store.dispatch(back());
    }
}
