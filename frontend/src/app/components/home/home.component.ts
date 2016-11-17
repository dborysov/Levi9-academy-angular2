import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ICartItem } from '../../reducers/shopping-cart.reducer';

import { INotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public items: Observable<ICartItem[]>;

    constructor(
        private _store: Store<ICartItem[]>,
        @Inject(INotificationsService) private _notificationService: INotificationsService
    ) {
        this._notificationService.success('Home page is opened!');

        this.items = _store;

        _store.dispatch({ type: 'REMOVE_ALL', payload: { id: 1, quantity: 20 } });
    }

}
