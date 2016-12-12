import { OpaqueToken, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { IState } from '../reducers';

import { IProduct } from '../models/product';

import { Store } from '@ngrx/store';

import * as catalog from '../actions/catalog';

import * as selectedProduct from '../actions/selectedProduct';

export const IProductsService = new OpaqueToken('IProductsApiService');
export interface IProductsService {
    getAllProducts(): void;
    createProduct(newProduct: IProduct): void;
    editProduct(newProduct: IProduct): void;
    removeProduct(id: number): void;
    selectItem(id: number): void;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class ProductsService implements IProductsService {

    private baseUrl = 'http://localhost:7778/api';
    private relativeUrl = 'products';
    constructor(
        private http: Http,
        private store: Store<IState>
    ) { }

    getAllProducts(): void {
        this.http
            .get(`${this.baseUrl}/${this.relativeUrl}`)
            .do(() => this.store.dispatch(new catalog.DeleteAllAction()))
            .flatMap(products => products.json() as IProduct[])
            .map(payload => new catalog.AddAction(payload))
            .subscribe(action => this.store.dispatch(action));
    };

    createProduct(newProduct: IProduct): void {
        this.http
            .post(`${this.baseUrl}/${this.relativeUrl}`, JSON.stringify(newProduct), { headers })
            .map(response => response.json() as IProduct)
            .map(payload => new catalog.AddAction(payload))
            .subscribe(action => this.store.dispatch(action));
    };

    editProduct(newProduct: IProduct): void {
        this.http
            .put(`${this.baseUrl}/${this.relativeUrl}/${newProduct.id}`, JSON.stringify(newProduct), { headers })
            .map(response => response.json() as IProduct)
            .map(payload => new catalog.EditAction(payload))
            .subscribe(action => this.store.dispatch(action));
    };

    removeProduct(id: number): void {
        this.http.delete(`${this.baseUrl}/${this.relativeUrl}/${id}`, { headers })
            .map(() => new catalog.DeleteAction({ id }))
            .subscribe(action => this.store.dispatch(action));
    };

    selectItem(id: number): void {
        this.store.dispatch(new selectedProduct.SelectAction({id}));
    }
}
