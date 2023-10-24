import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      let reservation = reservationService.getReservation(id)?.subscribe((reservation =>{
        this.reservationForm.patchValue(reservation);
      }));
      
    }
  }
  ngOnInit(): void {

  }
  reservationForm: FormGroup = new FormGroup({});
  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService.updateReservation(id, reservation).subscribe((reservation=>{
          this.router.navigate(['/list']);
        }));
      } 
      else {
        this.reservationService.addReservation(reservation).subscribe((reservation)=>{
          this.router.navigate(['/list']);
        });
      }
    }
  }
}
