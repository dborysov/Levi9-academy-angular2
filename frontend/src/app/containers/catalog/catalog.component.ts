import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IState } from '../../reducers';
import * as cartActions from '../../actions/cart';
import * as catalogActions from '../../actions/catalog';
import { getFilteredCatalogSelector } from '../../selectors';
import { IProduct } from '../../models';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [FormControlDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
    public catalog$: Observable<ReadonlyArray<IProduct>>;
    public filteredCatalog$: Observable<ReadonlyArray<IProduct>>;
    public selectedItem$: Observable<IProduct>;

    constructor(private store: Store<IState>, ) { }

    ngOnInit() {
        this.filteredCatalog$ = this.store.select<ReadonlyArray<IProduct>>(getFilteredCatalogSelector);

        this.store.dispatch(new catalogActions.LoadAction());
        this.store.dispatch(new catalogActions.SetFilterTermAction({ filterTerm: '' }));
    }

    search(filterTerm: string) {
        this.store.dispatch(new catalogActions.SetFilterTermAction({ filterTerm }));
    }

    addToCart(product: IProduct) {
        this.store.dispatch(new cartActions.AddQuantityAction({ id: product.id, quantity: 1 }));
    }
}
