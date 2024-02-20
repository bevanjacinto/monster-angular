import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlightInfoPayload } from '../../models/flight-info-payload.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightDetailsService {
  private apiUrl =
    'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';

  constructor(private http: HttpClient) {}

  //Method to submit a POST request
  submitFlightDetails(payload: FlightInfoPayload): Observable<any> {
    const headers = new HttpHeaders({
      token:
        'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      candidate: 'Bevan Jacinto',
    });

    return this.http.post(this.apiUrl, payload, { headers });
  }
}
