import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt-screen',
  templateUrl: './receipt-screen.page.html',
  styleUrls: ['./receipt-screen.page.scss'],
})
export class ReceiptScreenPage implements OnInit {

  reservation: any;

  constructor(public router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.reservation = navigation.extras.state['reservation'];
    }
  }

  ngOnInit() {
    if (!this.reservation) {
      this.router.navigate(['/']);
    }
  }


  //Sub-Total
  calculateSubtotal(): number {
    let price = 0;
    if (this.reservation.carType === 'sedan') {
      price = this.reservation.hours <= 5 ? 7 * this.reservation.hours : 70 * Math.ceil(this.reservation.hours / 24);
    } else if (this.reservation.carType === 'suv') {
      price = this.reservation.hours <= 5 ? 12 * this.reservation.hours : 100 * Math.ceil(this.reservation.hours / 24);
    }
    if (this.reservation.carSeat) {
      price += this.reservation.hours <= 10 ? 1 * this.reservation.hours : 10 * Math.ceil(this.reservation.hours / 24);
    }
    return price;
  }

  //Tax Amount
  calculateTax(subtotal: number): number {
    return subtotal * 0.13;
  }

  //Grand Total
  calculateTotal(subtotal: number, tax: number): number {
    return subtotal + tax;
  }

  //Random Reservation ID
  generateReservationId(): string {
    return 'RES-' + Math.floor(1000 + Math.random()* 9999);
  }

}
