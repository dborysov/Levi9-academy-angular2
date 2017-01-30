import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControlDirective, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as cartActions from '../../actions/cart';

import { IProduct } from '../../models/product';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [FormControlDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
    public catalog$: Observable<IProduct[]>;
    public catalogFiltered$: Observable<IProduct[]>;
    public selectedItem$: Observable<IProduct>;

    searchTerm: FormControl = new FormControl();

    constructor(private store: Store<fromRoot.IState>, ) { }

    ngOnInit() {
        this.catalog$ = this.store.select<IProduct[]>(fromRoot.getCatalogItems);

        const searchTerm$ = Observable.of('').merge(
            (this.searchTerm.valueChanges as Observable<string>)
                .debounceTime(300)
                .distinctUntilChanged());

        this.catalogFiltered$ = this.catalog$.combineLatest(searchTerm$)
            .map(([products, searchTerm]) => products.filter(product => !searchTerm || (product.category.indexOf(searchTerm) > -1)));
    }

    addToCart(product: IProduct) {
        this.store.dispatch(new cartActions.AddQuantityAction({ id: product.id, quantity: 1 }));
    }
}
