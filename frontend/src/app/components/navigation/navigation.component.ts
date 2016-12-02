import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppStore } from '../../../appStore';
import { ICartPosition } from '../../models/cartPosition';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    cartItemsCount: Observable<number>;

    constructor(
        private _store: Store<IAppStore>
    ) {
        this.cartItemsCount = _store.select<ICartPosition[]>('cart').map(products => products.length);
    }

    ngOnInit() { }

}
