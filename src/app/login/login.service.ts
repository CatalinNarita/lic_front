import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../app.component';

const REQUEST_TOKEN_URL = BASE_URL + '/oauth/token';
const CHECK_USER_ROLE_URL = BASE_URL + '/user/checkUserRole/';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  requestAccessToken(username: string, password: string): Observable<any> {
    const params: HttpParams = this.buildParams(username, password);
    const headers: HttpHeaders = this.buildHeaders();
    return this.http.post(REQUEST_TOKEN_URL, params, {headers: headers});
  }

  private buildParams(username: string, password: string): HttpParams {
    return new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa('android-oauth2-client-id:android-oauth2-client-pass'))
      .set('Content-Type', 'application/x-www-form-urlencoded');
  }

  checkUserRole(username: string): Observable<any> {
    return this.http.get(CHECK_USER_ROLE_URL + username);
  }

}
