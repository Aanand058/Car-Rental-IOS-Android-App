import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ReservationCar {
  carType: string = '';
  date: string = '';
  hours: number = 0;
  carSeat: boolean = false;

  constructor() {}


  isValid(): boolean {
    return !!this.carType && !!this.date && this.isValidDate(this.date) && this.hours >= 1 && this.hours <= 96;
  }

  isValidDate(dateString: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return dateString >= today;
  }


  reset(): void {
    this.carType = '';
    this.date = '';
    this.hours = 0;
    this.carSeat = false;
  }


  toJSON() {
    return {
      carType: this.carType,
      date: this.date,
      hours: this.hours,
      carSeat: this.carSeat
    }
  }
}
