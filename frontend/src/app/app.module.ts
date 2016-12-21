import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { NOTIFY_PROVIDERS } from '@ngrx/notify';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { ProductsEffects } from './effects/products';
import { UserEffects } from './effects/user';

import { IProductsService, ProductsService } from './services/products';
import { IUserService, UserService } from './services/user';

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
        RouterStoreModule.connectRouter(),
        StoreModule.provideStore(reducer),
        EffectsModule.run(ProductsEffects),
        EffectsModule.run(UserEffects),
    ],
    providers: [NOTIFY_PROVIDERS, {
        provide: IProductsService,
        useClass: ProductsService
    }, {
        provide: IUserService,
        useClass: UserService
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
