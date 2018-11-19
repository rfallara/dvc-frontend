import { Component, OnInit } from '@angular/core';
import {RoomsService} from './rooms.service';
import {BookableRoom} from './bookable-room.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

  private bookableRooms: BookableRoom[];
  private subscription: Subscription;

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.subscription = this.roomsService.bookableRoomsChanged.subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
      }
    );
    this.roomsService.getBookableRooms();
  }

}
