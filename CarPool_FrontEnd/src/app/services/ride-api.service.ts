import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRide } from '../models/BookRide';
import { OfferRide } from '../models/OfferRide';
import { RideCard } from '../models/RideCard';

@Injectable({
  providedIn: 'root'
})
export class RideApiService {

  private baseRidesUrl = 'https://carpool--api.azurewebsites.net/api/ride/';

  constructor(private http: HttpClient) {
  }

  headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('token'));
  private getHeaders() : HttpHeaders {
    return this.headers;
  }

  public offerRide(OfferRide: OfferRide): Observable<any> {
    return this.http.post(this.baseRidesUrl + 'offer', OfferRide, { headers : this.getHeaders() } );
  }

  public getMatchingRides(bookRide: BookRide): Observable<any> {
    return this.http.post(this.baseRidesUrl + 'matching', bookRide, { headers : this.getHeaders() });
  }

  public bookRide(matchingRide: RideCard): Observable<any> {
    return this.http.post(this.baseRidesUrl + 'book', matchingRide, { headers : this.getHeaders() });
  }

  public getBookedRides(): Observable<any> {
    return this.http.get(this.baseRidesUrl + 'booked', { headers : this.getHeaders() });
  }

  public getOfferedRides(): Observable<any> {
    return this.http.get(this.baseRidesUrl + 'offered', { headers : this.getHeaders() });
  }

}
