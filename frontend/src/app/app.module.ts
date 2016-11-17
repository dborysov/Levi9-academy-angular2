import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';

import { cartStore } from './services/shopping-cart.service';

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
        StoreModule.provideStore(cartStore)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
