import {Resort} from './resort.model';
import {RoomType} from './room-type.model';

export class BookableRoom {
  public id: number;
  public url: string;
  public resort: Resort;
  public roomType: RoomType;

  constructor(id: number, url: string, resort: Resort, roomType: RoomType) {
  }

}
