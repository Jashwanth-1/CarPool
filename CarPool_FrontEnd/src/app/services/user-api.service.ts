import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUserUrl = 'https://carpool--api.azurewebsites.net/api/user/';

  constructor(private http: HttpClient) {}

  public updateUser(user: User) {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.post(this.baseUserUrl + 'update', user, { headers });
  }

}
