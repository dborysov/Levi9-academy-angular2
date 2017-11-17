import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { IUser, ICredentials } from '../models';
import { map } from 'rxjs/operators';

const headers = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class UserService {
  private baseUrl = environment.apiBaseUrl;
  private relativeUrl = 'users';
  constructor(private http: Http) {}

  login(credentials: ICredentials): Observable<IUser> {
    const methodUrl = 'login';

    return this.http
      .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify(credentials), {
        headers,
      })
      .pipe(
        map((response: Response) => response.json() as string),
        map(token => ({ email: credentials.email, token })),
      );
  }

  register(credentials: ICredentials): Observable<IUser> {
    const methodUrl = 'register';

    return this.http
      .post(`${this.baseUrl}/${this.relativeUrl}/${methodUrl}`, JSON.stringify(credentials), {
        headers,
      })
      .pipe(
        map((response: Response) => response.json() as string),
        map(token => ({ email: credentials.email, token })),
      );
  }
}
