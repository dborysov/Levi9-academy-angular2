import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AdminComponent,
    CartComponent,
    CatalogComponent,
    HomeComponent,
    ProductDetailsPageComponent,
    ProductCreateComponent,
    LoginComponent,
    RegisterComponent
} from './components';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'catalog/:id', component: ProductDetailsPageComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/create', component: ProductCreateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
