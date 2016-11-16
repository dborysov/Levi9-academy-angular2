import { Injectable, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { Product } from '../models/product';

export const IProductsApiService = new OpaqueToken('IProductsApiService');
export interface IProductsApiService {
    getAllProducts(): Observable<Product[]>;
    getProductById(id: number): Observable<Product>;
    createNewProduct(newProduct: Product): Observable<Product>;
    editProduct(newProduct: Product): Observable<Product>;
    removeProduct(id: number): Observable<void>;
}

@Injectable()
export class ProductsApiService implements IProductsApiService {

    private _baseUrl = 'http://localhost:7778/api';
    private _relativeUrl = 'products';

    constructor(private _http: Http) { }

    getAllProducts(): Observable<Product[]> {
        return this._http
            .get(`${this._baseUrl}/${this._relativeUrl}`)
            .map(products => products.json() as Product[]);
    };

    getProductById(id: number): Observable<Product> {
        return this._http
            .get(`${this._baseUrl}/${this._relativeUrl}/id`)
            .map(response => response.json() as Product);
    };

    createNewProduct(newProduct: Product): Observable<Product> {
        return this._http
            .post(`${this._baseUrl}/${this._relativeUrl}`, newProduct)
            .map(response => response.json() as Product);
    };

    editProduct(newProduct: Product): Observable<Product> {
        return this._http
            .put(`${this._baseUrl}/${this._relativeUrl}/${newProduct.id}`, newProduct)
            .map(response => response.json() as Product);
    };

    removeProduct(id: number): Observable<void> {
        return this._http.delete(`${this._baseUrl}/${this._relativeUrl}/${id}`)
            .mapTo(undefined);
    };

}
