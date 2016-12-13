import { OpaqueToken, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { IProduct } from '../models/product';


export const IProductsService = new OpaqueToken('IProductsApiService');
export interface IProductsService {
    getAllProducts(): Observable<IProduct[]>;
    createProduct(newProduct: IProduct): Observable<Response>;
    editProduct(newProduct: IProduct): Observable<Response>;
    removeProduct(product: IProduct): Observable<Response>;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class ProductsService implements IProductsService {

    private baseUrl = environment.apiBaseUrl;
    private relativeUrl = 'products';
    constructor(private http: Http, ) { }

    getAllProducts(): Observable<IProduct[]> {
        return this.http
            .get(`${this.baseUrl}/${this.relativeUrl}`)
            .map(products => products.json() as IProduct[]);
    };

    createProduct(newProduct: IProduct): Observable<Response> {
        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}`, JSON.stringify(newProduct), { headers });
    };

    editProduct(newProduct: IProduct): Observable<Response> {
        return this.http
            .put(`${this.baseUrl}/${this.relativeUrl}/${newProduct.id}`, JSON.stringify(newProduct), { headers });
    };

    removeProduct(product: IProduct): Observable<Response> {
        return this.http.delete(`${this.baseUrl}/${this.relativeUrl}/${product.id}`, { headers });
    };
}
