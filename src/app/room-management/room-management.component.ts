import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomsService} from './rooms.service';
import {BookableRoom} from './bookable-room.model';
import {Subscription} from 'rxjs';
import {Resort} from './resort.model';
import {RoomType} from './room-type.model';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  private bookableRooms: BookableRoom[] = [];
  selectedResort: Resort;
  private subscription: Subscription;
  @ViewChild('roomTypeChild') roomTypeChild;

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.subscription = this.roomsService.bookableRoomsChanged.subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
      }
    );
    this.roomsService.getBookableRooms();
  }

  resortSelected(currentResort: Resort) {
    if (currentResort === null || currentResort ===  undefined) {
      this.roomTypeChild.selectedResortChange([]);
      this.roomTypeChild.activeResortSelection = false;
    } else {
      const selectedRoomTypeIds = [];
      for (const thisBookableRoom of this.bookableRooms) {
        if (thisBookableRoom.resort.id === currentResort.id) {
          selectedRoomTypeIds.push(thisBookableRoom.room_type.id);
        }
      }
      this.roomTypeChild.selectedResortChange(selectedRoomTypeIds);
      this.selectedResort = currentResort;
      this.roomTypeChild.activeResortSelection = true;
    }
  }

  roomTypeSelected(currentRoomType: RoomType) {
    if (this.checkForBookableRoom(this.selectedResort.id, currentRoomType.id)) {
      alert('Bookable Room Exists');
    } else {
      alert('Not a bookable room');
    }
  }

  checkForBookableRoom(resortId: number, roomTypeId: number) {
    for (const currentBookableRoom of this.bookableRooms) {
      if (currentBookableRoom.resort.id === resortId &&
        currentBookableRoom.room_type.id === roomTypeId) {
        return true;
      }
    }
    return false;
  }

}
