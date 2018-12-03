import {Owner} from '../shared/owner.model';
import {BookableRoom} from '../room-management/bookable-room.model';


export class Trip {
  public id: number;

  constructor (public owner: Owner, public notes: string, public bookable_room: BookableRoom,
               public booked_date: Date, public check_in_date: Date, public check_out_date: Date,
               public points_needed: number) {}
}
