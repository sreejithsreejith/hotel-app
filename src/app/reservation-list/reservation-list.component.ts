import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
      console.log(reservations.length);
    });
  }

  reservations: Reservation[] = [];

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log('deleted.');
      this.reservationService.getReservations().subscribe((reservations) => {
        this.reservations = reservations;
      });
    });
  }
}
