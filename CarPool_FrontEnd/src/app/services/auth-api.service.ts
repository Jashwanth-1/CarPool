import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseAuthenticationUrl = 'https://carpool--api.azurewebsites.net/api/auth/';

  constructor(private http: HttpClient) {}

  public signUpUser(user: User): Observable<any> {
    return this.http.post(this.baseAuthenticationUrl + 'signup', user);
  }

  public loginUser(user: User): Observable<any> {
    return this.http.post(this.baseAuthenticationUrl + 'login', user);
  }

}
