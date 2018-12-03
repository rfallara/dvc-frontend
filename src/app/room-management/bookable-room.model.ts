import {Resort} from './resort.model';
import {RoomType} from './room-type.model';

export class BookableRoom {
  public id: number;
  public url: string;
  public resort: Resort;
  public room_type: RoomType;

  constructor(resort: Resort, room_type: RoomType) {
    this.resort = resort;
    this.room_type = room_type;
  }

}
