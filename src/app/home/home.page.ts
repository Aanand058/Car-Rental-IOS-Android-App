import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationCar } from '../models/reservation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Error Message Div 
  errorMessage: string = '';

  constructor(private router: Router,
    public reservation: ReservationCar
  ) { }

  buttonSubmit() {

    this.errorMessage = '';

    if (!this.reservation.carType) {
      this.errorMessage += 'Car Type: You must select a car type.';
    }

    if (!this.reservation.date) {
      this.errorMessage += 'Reservation Date: You must enter a valid date.';
    }
    if (!this.reservation.isValidDate(this.reservation.date)) {
      this.errorMessage += 'Reservation Date: Date must be today or in the future.';
    }

    if (this.reservation.hours < 1 || this.reservation.hours > 96) {
      this.errorMessage += 'Hours: You must enter a value between 1-96.';
    }

    if (this.errorMessage) {
      this.errorMessage =  this.errorMessage;
      return;
    }


    // Navigatation with stringify the data 
    this.router.navigate(['/receipt-screen'], {
      state: { reservation: this.reservation.toJSON() }
    });




  }

  buttonReset() {
    this.reservation.reset();
    this.errorMessage = '';
  }


}
