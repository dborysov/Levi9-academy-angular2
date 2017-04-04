import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { IProduct } from '../models';

@Injectable()
export class ProductsService {

    private baseUrl = environment.apiBaseUrl;
    private relativeUrl = 'products';
    constructor(private http: Http, ) { }

    getProducts(ids?: number[]): Observable<IProduct[]> {
        return this.http
            .get(`${this.baseUrl}/${this.relativeUrl}`, ids && ids.length ? { search: ids.map(id => `ids=${id}`).join('&') } : null)
            .map(products => products.json() as IProduct[]);
    };

    createProduct(newProduct: IProduct, token: string): Observable<Response> {
        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}`, JSON.stringify(newProduct), { headers: this.getHeaders(token) });
    };

    editProduct(newProduct: IProduct): Observable<Response> {
        return this.http
            .put(`${this.baseUrl}/${this.relativeUrl}/${newProduct.id}`, JSON.stringify(newProduct), { headers: this.getHeaders() });
    };

    removeProduct(product: IProduct, token: string): Observable<Response> {
        return this.http
            .delete(`${this.baseUrl}/${this.relativeUrl}/${product.id}`, { headers: this.getHeaders(token) });
    };

    private getHeaders(token?: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
}
