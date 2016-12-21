import { OpaqueToken, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { IUser } from '../models/user';


export const IUserService = new OpaqueToken('IUserService');
export interface IUserService {
    login(email: string, password: string): Observable<IUser>;
    register(email: string, password: string): Observable<IUser>;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class UserService implements IUserService {

    private baseUrl = environment.apiBaseUrl;
    private relativeUrl = 'users';
    constructor(private http: Http, ) { }

    login(email: string, password: string): Observable<IUser> {
        const methodUrl = 'login';

        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify({ email, password }), { headers })
            .map((response: Response) => response.json() as string)
            .map(token => ({ email, token }));
    }

    register(email: string, password: string): Observable<IUser> {
        const methodUrl = 'register';

        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify({ email, password }), { headers })
            .map((response: Response) => response.json() as string)
            .map(token => ({ email, token }));
    }
}
