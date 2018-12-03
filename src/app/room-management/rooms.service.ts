import {Resort} from './resort.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RoomType} from './room-type.model';
import {BookableRoom} from './bookable-room.model';
import {Globals} from '../gobals';
import index from '@angular/cli/lib/cli';

@Injectable()
export class RoomsService {
  private resorts: Resort[];
  resortsChanged = new Subject<Resort[]>();
  private roomTypes: RoomType[];
  roomTypesChanged = new Subject<RoomType[]>();
  private bookableRooms: BookableRoom[];
  bookableRoomsChanged = new Subject<BookableRoom[]>();

  constructor(private http: HttpClient, private globals: Globals) {
  }

  getResorts() {
    this.http.get(this.globals.dvcApiServer + '/api/resorts/').subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
        this.resortsChanged.next(this.resorts.slice());
      }
    );
    // return this.resorts.slice(); // return a copy
  }

  addResort(newResortName: string) {
    const newResort = {'name': newResortName};
    this.http.post(this.globals.dvcApiServer + '/api/resorts/', newResort).subscribe(
      (newResortResult: Resort) => {
        this.resorts.push(newResortResult);
        this.resorts.sort((a, b) => { // sort the list of resorts
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        this.resortsChanged.next(this.resorts.slice());
      }, (error: string) => {
        console.log(error);
        alert('Unable to add resort.');
      } );
  }

  removeResort(resortId: number) {
    this.http.delete(this.globals.dvcApiServer + '/api/resorts/' + resortId).subscribe(
      () => {
        this.getResorts();
      },
      (error: string) => {
        console.log(error);
        alert('Unable to delete resort');
      }
    );
  }

  getRoomTypes() {
    this.http.get(this.globals.dvcApiServer + '/api/room_types/').subscribe(
      (roomTypes: RoomType[]) => {
        roomTypes.sort(
          (a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
            ((a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
              0)
        );

        this.roomTypes = roomTypes;
        this.roomTypesChanged.next(this.roomTypes.slice());
      }
    );
    // return this.roomTypes.slice();
  }

  addRoomType(newRoomTypeName: string, newRoomTypeSleeps: number) {
    const newRoomType = {
      'name': newRoomTypeName,
      'sleeps': newRoomTypeSleeps
    };
    this.http.post(this.globals.dvcApiServer + '/api/room_types/', newRoomType).subscribe(
      (newRoomTypeResult: RoomType) => {
        this.roomTypes.push(newRoomTypeResult);
        this.roomTypes.sort( (a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        this.roomTypesChanged.next(this.roomTypes.slice());
      }, (error: string) => {
        console.log(error);
        alert('Unable to add room type.');
      });
  }

  removeRoomType(roomTypeId: number) {
    this.http.delete(this.globals.dvcApiServer + '/api/room_types/' + roomTypeId).subscribe(
      () => { this.getRoomTypes(); },
      (error: string) => {
        console.log(error);
        alert('Unable to delete room type.');
      }
    );
  }

  getBookableRooms() {
    this.http.get(this.globals.dvcApiServer + '/api/bookable_rooms/').subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
        this.bookableRoomsChanged.next(this.bookableRooms.slice());
      }
    );
  }

  addBookableRoom(resort: Resort, roomType: RoomType) {
    const newBookableRoom = new BookableRoom(resort, roomType);

    this.http.post(this.globals.dvcApiServer + '/api/bookable_rooms/', newBookableRoom).subscribe(
      (createdBookableRoom: BookableRoom) => {
        this.bookableRooms.push(createdBookableRoom);
        this.bookableRoomsChanged.next(this.bookableRooms.slice());
      }, (error: string) => {
        console.log(error);
        alert('Unable to create new bookable room.');
      }
    );
  }

  removeBookableRoom(bookableRoomId: number) {
    this.http.delete(this.globals.dvcApiServer + '/api/bookable_rooms/' + bookableRoomId).subscribe(
      () => {
        this.bookableRooms.forEach((thisBookableRoom, thisIndex) => {
          if (thisBookableRoom.id === bookableRoomId) {
            this.bookableRooms.splice(thisIndex, 1);
          }
        });
        this.bookableRoomsChanged.next(this.bookableRooms.slice());
      }, (error: string) => {
        console.log(error);
        alert('Unable to delete bookable room');
      }
    );
  }
}
