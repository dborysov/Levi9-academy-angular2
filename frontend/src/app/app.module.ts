import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { NOTIFY_PROVIDERS } from '@ngrx/notify';

import { AppRoutingModule } from './app-routing.module';

import { INotificationsService, NotificationsService } from './services/notifications.service';
import { IProductsService, ProductsService } from './services/products.service';
import { ICartService, CartService } from './services/cart.service';

import {
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CatalogComponent,
    CartComponent,
    AdminComponent,
    ProductDetailsPageComponent,
    ProductCreateComponent
} from './components';

import { reducer } from './reducers';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        CatalogComponent,
        CartComponent,
        AdminComponent,
        ProductDetailsPageComponent,
        ProductCreateComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        StoreModule.provideStore(reducer)
    ],
    providers: [NOTIFY_PROVIDERS, {
        provide: INotificationsService,
        useClass: NotificationsService
    }, {
        provide: IProductsService,
        useClass: ProductsService
    }, {
        provide: ICartService,
        useClass: CartService
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
