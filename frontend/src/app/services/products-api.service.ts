import { OpaqueToken, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { IProduct } from '../models/product';

export const IProductsApiService = new OpaqueToken('IProductsApiService');
export interface IProductsApiService {
    getAllProducts(): Observable<IProduct[]>;
    getProductById(id: number): Observable<IProduct>;
    createNewProduct(newProduct: IProduct): Observable<IProduct>;
    editProduct(newProduct: IProduct): Observable<IProduct>;
    removeProduct(id: number): Observable<void>;
}

@Injectable()
export class ProductsApiService implements IProductsApiService {

    private _baseUrl = 'http://localhost:7778/api';
    private _relativeUrl = 'products';
    constructor(private _http: Http) { }

    getAllProducts(): Observable<IProduct[]> {
        return this._http
            .get(`${this._baseUrl}/${this._relativeUrl}`)
            .map(products => products.json() as IProduct[]);
    };

    getProductById(id: number): Observable<IProduct> {
        return this._http
            .get(`${this._baseUrl}/${this._relativeUrl}/id`)
            .map(response => response.json() as IProduct);
    };

    createNewProduct(newProduct: IProduct): Observable<IProduct> {
        return this._http
            .post(`${this._baseUrl}/${this._relativeUrl}`, newProduct)
            .map(response => response.json() as IProduct);
    };

    editProduct(newProduct: IProduct): Observable<IProduct> {
        return this._http
            .put(`${this._baseUrl}/${this._relativeUrl}/${newProduct.id}`, newProduct)
            .map(response => response.json() as IProduct);
    };

    removeProduct(id: number): Observable<void> {
        return this._http.delete(`${this._baseUrl}/${this._relativeUrl}/${id}`)
            .mapTo(undefined);
    };

}
