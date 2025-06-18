namespace hotelmanagement;

using { managed } from '@sap/cds/common';

entity Guests : managed {
  key guestID       : UUID;
  firstName         : String(50);
  lastName          : String(50);
  email             : String(100);
  phoneNumber       : String(15);
  address           : String;
  idProofType       : String(20); // e.g. Passport, Aadhar, etc.
  idProofNumber     : String(30);
}

entity Rooms : managed {
  key roomNumber     : Integer;
  type               : String(20); // e.g. Single, Double, Suite
  status             : String(20); // e.g. Available, Booked, Maintenance
  pricePerNight      : Decimal(10,2);
  floor              : Integer;
  description        : String;
}

// enum BookingStatus {
//   Confirmed;
//   Cancelled;
//   Completed;
// }
entity Bookings : managed {
  key bookingID      : UUID;
  guestName          : String(100);
  roomNumber         : Integer;
  checkInDate        : Date;
  checkOutDate       : Date;
  numberOfGuests     : Integer;
  bookingStatus      : String;
  notes              : String;
}

