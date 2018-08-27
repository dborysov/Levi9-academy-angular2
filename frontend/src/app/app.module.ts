import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';

import * as effects from './effects';
import * as guards from './guards';
import * as services from './services';
import * as containers from './containers';
import * as components from './components';

import { environment } from '../environments/environment';
import { reducerToken, reducerProvider } from 'app/reducers';

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
    StoreModule.forRoot(reducerToken),
    EffectsModule.forRoot([
      effects.UserEffects,
      effects.SelectedProductEffects,
      effects.NotificationsEffects,
      effects.RouterEffects,
      effects.ProductsEffects,
    ]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    guards.LoggedInGuard,
    services.ProductsService,
    services.UserService,
    reducerProvider,
  ],
  bootstrap: [containers.NavigationComponent],
})
export class AppModule {}
