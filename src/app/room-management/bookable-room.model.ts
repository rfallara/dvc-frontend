import {Resort} from './resort.model';
import {RoomType} from './room-type.model';

export class BookableRoom {
  public id: number;
  public url: string;
  public resort: Resort;
  public room_type: RoomType;

  constructor(id: number, url: string, resort: Resort, room_type: RoomType) {
  }

}
