import { Injectable, NgZone } from '@angular/core';
import { Reservation } from '../models/reservation';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService implements OnInit {
  private apiUrl = "https://onlineexaminationlive.azurewebsites.net";
  constructor(
    private http: HttpClient) {
  }
  ngOnInit(): void {}
  private reservations: Reservation[] = [];

  getReservations(): Observable<Reservation[]> {
    return  this.http.get<Reservation[]>(this.apiUrl + "/reservation/");
  }

  getReservation(id: string): Observable<Reservation> | undefined {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/" + id); 
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl + "/reservation/", reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/" + id); 
  }

  updateReservation(id: string, reservation: Reservation): Observable<Reservation> {
    console.log(id);
    console.log('resid' + id);
    return this.http.put<Reservation>(this.apiUrl + "/reservation/" + id, reservation);
  }
}
