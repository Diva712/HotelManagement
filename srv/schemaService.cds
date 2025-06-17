using { hotelmanagement as hm } from '../db/schema';

service HotelService {
  entity Guests as projection on hm.Guests;
  entity Rooms  as projection on hm.Rooms;
}
