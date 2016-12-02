import { OpaqueToken, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { IAppStore } from '../../appStore';

import { IProduct } from '../models/product';

import { Store } from '@ngrx/store';

import { ADD_PRODUCT, REMOVE_ALL_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT, SELECT_PRODUCT } from '../actions/products-actions';

export const IProductsApiService = new OpaqueToken('IProductsApiService');
export interface IProductsApiService {
    getAllProducts(): void;
    createProduct(newProduct: IProduct): void;
    editProduct(newProduct: IProduct): void;
    removeProduct(id: number): void;
    selectItem(id: number): void;
}

@Injectable()
export class ProductsApiService implements IProductsApiService {

    private _baseUrl = 'http://localhost:7778/api';
    private _relativeUrl = 'products';
    constructor(
        private _http: Http,
        private _store: Store<IAppStore>
    ) { }

    getAllProducts(): void {
        this._http
            .get(`${this._baseUrl}/${this._relativeUrl}`)
            .do(() => this._store.dispatch({ type: REMOVE_ALL_PRODUCTS }))
            .flatMap(products => products.json() as IProduct[])
            .map(payload => ({ type: ADD_PRODUCT, payload }))
            .subscribe(action => this._store.dispatch(action));
    };

    createProduct(newProduct: IProduct): void {
        this._http
            .post(`${this._baseUrl}/${this._relativeUrl}`, JSON.stringify(newProduct), { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map(response => response.json() as IProduct)
            .map(payload => ({ type: ADD_PRODUCT, payload }))
            .subscribe(action => this._store.dispatch(action));
    };

    editProduct(newProduct: IProduct): void {
        this._http
            .put(`${this._baseUrl}/${this._relativeUrl}/${newProduct.id}`, newProduct)
            .map(response => response.json() as IProduct)
            .map(payload => ({ type: EDIT_PRODUCT, payload }))
            .subscribe(action => this._store.dispatch(action));
    };

    removeProduct(id: number): void {
        this._http.delete(`${this._baseUrl}/${this._relativeUrl}/${id}`)
            .map(() => ({ type: DELETE_PRODUCT, payload: { id } }))
            .subscribe(action => this._store.dispatch(action));
    };

    selectItem(id: number): void {
        this._http
            .get(`${this._baseUrl}/${this._relativeUrl}/${id}`)
            .map(response => response.json() as IProduct)
            .map(payload => ({ type: SELECT_PRODUCT, payload }))
            .subscribe(action => this._store.dispatch(action));
    }
}
