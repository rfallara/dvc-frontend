import {RoomType} from '../room-type.model';

export class RoomTypeCollection {
  public roomType: RoomType;
  public activeSelection: boolean;

  constructor (roomType: RoomType, activeSelection: boolean){
    this.roomType = roomType;
    this.activeSelection = activeSelection;
  }
}
