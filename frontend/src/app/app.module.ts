import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { INotificationsService, NotificationsService } from './services/notifications.service';
import { IProductsApiService, ProductsApiService } from './services/products-api.service';

import { AppComponent } from './components/app/app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';

import { cartStoreReducer } from './reducers/shopping-cart.reducer';

const savedCart = JSON.parse(localStorage.getItem('cart'));
const cartStoreInitialValue = savedCart || [];
localStorage.setItem('cart', JSON.stringify(cartStoreInitialValue));

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        CatalogComponent,
        CartComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        StoreModule.provideStore(cartStoreReducer, cartStoreInitialValue)
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
