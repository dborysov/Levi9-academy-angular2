import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from '../../models';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    @Input() products: IProduct[];
    @Output() addToCart = new EventEmitter<IProduct>();
    @Output() search = new EventEmitter<string>();

    searchInput = new FormControl();
    valueChangesSubscription: Subscription;

    ngOnInit() {
        this.valueChangesSubscription =
            this.searchInput.valueChanges
                .debounceTime(300)
                .distinctUntilChanged()
                .subscribe(searchTerm => this.search.emit(searchTerm));
    }

    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
