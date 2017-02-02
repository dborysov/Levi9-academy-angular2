import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as catalogActions from '../../actions/catalog';

import { IProduct } from '../../models/product';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
    public products$: Observable<IProduct[]>;

    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() {
        this.products$ = this.store.select(fromRoot.getCatalogItems);

        this.store.dispatch(new catalogActions.LoadAction());
    }

    removeProduct(product: IProduct) {
        this.store.dispatch(new catalogActions.DeleteAction(product));
    }
}
