import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';

import * as effects from './effects';
import * as guards from './guards';
import * as services from './services';
import * as containers from './containers';
import * as components from './components';

import { reducer } from './reducers';

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

        components.ProductsAdminComponent,
        components.CartTableComponent,
        components.ProductsComponent,
        components.LoginFormComponent,
        components.NavigationBarComponent,
        components.ProductCreateFormComponent,
        components.ProductDetailsComponent,
        components.RegistrationFormComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        RouterStoreModule.connectRouter(),
        StoreModule.provideStore(reducer),
        EffectsModule.run(effects.ProductsEffects),
        EffectsModule.run(effects.UserEffects),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ],
    providers: [{
        provide: services.IProductsService,
        useClass: services.ProductsService
    }, {
        provide: services.IUserService,
        useClass: services.UserService
    }, guards.LoggedInGuard],
    bootstrap: [containers.NavigationComponent]
})
export class AppModule { }
