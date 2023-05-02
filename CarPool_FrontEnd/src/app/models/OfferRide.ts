import { BookRide } from './BookRide';

export class OfferRide extends BookRide {
  price: number = 0;
  stops: string = '';
  availableSeats: string = '1';
}
