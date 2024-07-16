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
  errorMessage: string[]= [];

  constructor(private router: Router,
    public reservation: ReservationCar
  ) { }

  buttonSubmit() {

    this.errorMessage = [];

    if (!this.reservation.carType) {
      this.errorMessage.push('Car Type: You must select a car type.');
    }

    if (!this.reservation.date) {
      this.errorMessage.push('Reservation Date: You must enter a valid date.');
    }
    if (!this.reservation.isValidDate(this.reservation.date)) {
      this.errorMessage.push('Reservation Date: Date must be today or in the future.');
    }

    if (this.reservation.hours < 1 || this.reservation.hours > 96) {
      this.errorMessage.push('Hours: You must enter a value between 1-96.');
    }

    if (this.errorMessage.length > 0) {
      return;
    }

    this.errorMessage = [];


    // Navigatation with stringify the data 
    this.router.navigate(['/receipt-screen'], {
      state: { reservation: this.reservation.toJSON() }
    });

  }

  buttonReset() {
    this.reservation.reset();
    this.errorMessage = [];
  }


}
