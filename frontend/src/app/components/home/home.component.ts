import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppStore } from '../../../appStore';

import { IProduct } from '../../models/product';

import { INotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public items: Observable<IProduct[]>;

    constructor(
        private _store: Store<IAppStore>,
        @Inject(INotificationsService) private _notificationService: INotificationsService
    ) {
        this._notificationService.success('Home page is opened!');

        this.items = _store.select<IProduct[]>('cart');
    }
}
