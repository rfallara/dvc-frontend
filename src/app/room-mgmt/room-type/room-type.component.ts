import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {RoomsService} from '../rooms.service';
import {RoomType} from '../room-type.model';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit {

  roomTypes: RoomType[] = [];
  subscription: Subscription;

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.subscription = this.roomsService.roomTypesChanged.subscribe(
      (roomTypes: RoomType[]) => {
        this.roomTypes = roomTypes;
      }
    );
    this.roomsService.getRoomTypes();
  }

  onNewRoomType() {}

}
