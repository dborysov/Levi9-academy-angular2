import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'catalog', redirectTo: '/', pathMatch: 'full' },
    { path: 'catalog/:productId', redirectTo: '/', pathMatch: 'full' },
    { path: 'cart', redirectTo: '/', pathMatch: 'full' },
    { path: 'admin', redirectTo: '/', pathMatch: 'full' },
    { path: 'admin/create', redirectTo: '/', pathMatch: 'full' },
    { path: 'admin/edit/:productId', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
