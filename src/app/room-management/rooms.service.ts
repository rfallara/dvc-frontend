import {Resort} from './resort.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RoomType} from './room-type.model';
import {BookableRoom} from './bookable-room.model';

@Injectable()
export class RoomsService {
  private resorts: Resort[];
  resortsChanged = new Subject<Resort[]>();
  private roomTypes: RoomType[];
  roomTypesChanged = new Subject<RoomType[]>();
  private bookableRooms: BookableRoom[];
  bookableRoomsChanged = new Subject<BookableRoom[]>();

  constructor(private http: HttpClient) {
  }

  getResorts() {
    this.http.get('https://dvc-restful.appspot.com/api/resorts/').subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
        this.resortsChanged.next(this.resorts.slice());
      }
    );
    // return this.resorts.slice(); // return a copy
  }

  getRoomTypes() {
    this.http.get('https://dvc-restful.appspot.com/api/room_types/').subscribe(
      (roomTypes: RoomType[]) => {
        this.roomTypes = roomTypes;
        this.roomTypesChanged.next(this.roomTypes.slice());
      }
    );
    // return this.roomTypes.slice();
  }

  getBookableRooms() {
    this.http.get('https://dvc-restful.appspot.com/api/bookable_rooms/').subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
        this.bookableRoomsChanged.next(this.bookableRooms.slice());
      }
    );
  }

}
