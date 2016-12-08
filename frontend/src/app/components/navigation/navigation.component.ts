import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../reducers';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    cartItemsCount$: Observable<number>;

    constructor(private store: Store<fromRoot.IState>) { }

    ngOnInit() {
        this.cartItemsCount$ = this.store.select(fromRoot.getCartItems).map(products => products.length);
    }
}
