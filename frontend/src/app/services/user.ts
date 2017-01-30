import { OpaqueToken, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { IUser } from '../models/user';
import { ICredentials } from '../models/credentials';


export const IUserService = new OpaqueToken('IUserService');
export interface IUserService {
    login(credentials: ICredentials): Observable<IUser>;
    register(credentials: ICredentials): Observable<IUser>;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class UserService implements IUserService {

    private baseUrl = environment.apiBaseUrl;
    private relativeUrl = 'users';
    constructor(private http: Http, ) { }

    login(credentials: ICredentials): Observable<IUser> {
        const methodUrl = 'login';

        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify(credentials), { headers })
            .map((response: Response) => response.json() as string)
            .map(token => ({ email: credentials.email, token }));
    }

    register(credentials: ICredentials): Observable<IUser> {
        const methodUrl = 'register';

        return this.http
            .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify(credentials), { headers })
            .map((response: Response) => response.json() as string)
            .map(token => ({ email: credentials.email, token }));
    }
}
