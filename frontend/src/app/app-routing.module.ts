import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as containers from './containers';
import * as guards from './guards';

const routes: Routes = [
    { path: '', component: containers.HomeComponent },
    { path: 'catalog', component: containers.CatalogComponent },
    { path: 'catalog/:id', component: containers.ProductDetailsPageComponent },
    { path: 'cart', component: containers.CartComponent },
    { path: 'admin', component: containers.AdminComponent, canActivate: [guards.LoggedInGuard] },
    { path: 'admin/create', component: containers.ProductCreateComponent, canActivate: [guards.LoggedInGuard] },
    { path: 'login', component: containers.LoginComponent },
    { path: 'register', component: containers.RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
