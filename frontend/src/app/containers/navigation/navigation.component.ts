import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as selectors from '../../selectors';
import * as userActions from '../../actions/user';
import * as routerActions from '../../actions/router';
import { IState } from '../../reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public cartItemsCount$: Observable<number>;
  public userEmail$: Observable<string>;
  public userIsSignedIn$: Observable<boolean>;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.cartItemsCount$ = this.store
      .select(selectors.getLoadedCartItemsSelector)
      .pipe(map(products => products.length));
    this.userEmail$ = this.store.select(selectors.getUserEmailSelector);
    this.userIsSignedIn$ = this.store.select(selectors.getUserIsSignedInSelector);
  }

  logout() {
    this.store.dispatch(new userActions.LogoutAction());
    this.store.dispatch(new routerActions.Go({ path: [''] }));
  }
}
