import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from '../../actions/user';
import * as fromRoot from '../../reducers';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public cartItemsCount$: Observable<number>;
    public userEmail$: Observable<string>;

    constructor(private store: Store<fromRoot.IState>) { }

    ngOnInit() {
        this.cartItemsCount$ = this.store.select(fromRoot.getCartItemsDetails).map(products => products.length);
        this.userEmail$ = this.store.select(fromRoot.getUserEmail);
    }

    logout() {
        this.store.dispatch(new userActions.LogoutAction());
    }
}
