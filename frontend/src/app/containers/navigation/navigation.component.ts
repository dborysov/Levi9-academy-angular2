import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as selectors from '../../selectors';
import * as userActions from '../../actions/user';
import { IState } from '../../reducers';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
    public cartItemsCount$: Observable<number>;
    public userEmail$: Observable<string>;
    public userIsSignedIn$: Observable<boolean>;

    constructor(private store: Store<IState>) { }

    ngOnInit() {
        this.cartItemsCount$ = this.store.select(selectors.getCartItemsSelector).map(products => products.length);
        this.userEmail$ = this.store.select(selectors.getUserEmailSelector);
        this.userIsSignedIn$ = this.store.select(selectors.getUserIsSignedInSelector);
    }

    logout() {
        this.store.dispatch(new userActions.LogoutAction());
        this.store.dispatch(go(''));
    }
}
