import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IState } from '../../reducers';
import * as catalogActions from '../../actions/catalog';
import { getCatalogItemsSelector } from '../../selectors';
import { IProduct } from '../../models';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
    public products$: Observable<ReadonlyArray<IProduct>>;

    constructor(private store: Store<IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select(getCatalogItemsSelector);

        this.store.dispatch(new catalogActions.LoadAction());
    }

    removeProduct(product: IProduct) {
        this.store.dispatch(new catalogActions.DeleteAction(product));
    }
}
