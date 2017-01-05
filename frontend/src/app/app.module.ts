import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { ProductsEffects } from './effects/products';
import { UserEffects } from './effects/user';

import { IProductsService, ProductsService } from './services/products';
import { IUserService, UserService } from './services/user';

import * as containers from './containers';
import * as components from './components';

import { reducer } from './reducers';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';

@NgModule({
    declarations: [
        containers.AdminComponent,
        containers.CartComponent,
        containers.CatalogComponent,
        containers.HomeComponent,
        containers.LoginComponent,
        containers.NavigationComponent,
        containers.ProductCreateComponent,
        containers.ProductDetailsPageComponent,
        containers.RegisterComponent,

        components.ProductsAdminComponent
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
    providers: [{
        provide: IProductsService,
        useClass: ProductsService
    }, {
        provide: IUserService,
        useClass: UserService
    }],
    bootstrap: [containers.NavigationComponent]
})
export class AppModule { }
