import './rxjs-extensions';

import { Config } from './config';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { INotificationsService, NotificationsService } from './services/notifications.service';
import { IProductsApiService, ProductsApiService } from './services/products-api.service';

import {
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    AdminComponent,
    ProductDetailsPageComponent
} from './components/all';

import { cartStoreReducer } from './reducers/shopping-cart-items.reducer';
import { catalogItemsReducer } from './reducers/catalog-items.reducer';
import { selectedProductReducer } from './reducers/selected-product-reducer';
import { saveToLocalStorageMetaReducer } from './reducers/save-to-local-storage.meta-reducer';

const cartStoreInitialValue = JSON.parse(localStorage.getItem(Config.localStorageKeyChart)) || [];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        CatalogComponent,
        CartComponent,
        AdminComponent,
        ProductDetailsPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        StoreModule.provideStore(
            {
                cart: saveToLocalStorageMetaReducer(cartStoreReducer),
                catalog: catalogItemsReducer,
                selectedProduct: selectedProductReducer
            }, {
                cart: cartStoreInitialValue,
                catalog: [],
                selectedProduct: null
            })
    ],
    providers: [{
        provide: INotificationsService,
        useClass: NotificationsService
    }, {
        provide: IProductsApiService,
        useClass: ProductsApiService
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
