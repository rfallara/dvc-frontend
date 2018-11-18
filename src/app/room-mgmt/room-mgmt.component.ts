import { Component, OnInit } from '@angular/core';
import {RoomsService} from './rooms.service';
import {Resort} from './resort.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room-mgmt',
  templateUrl: './room-mgmt.component.html',
  styleUrls: ['./room-mgmt.component.css']
})
export class RoomMgmtComponent implements OnInit {
  resorts: Resort[] = [];
  subscription: Subscription;

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.subscription = this.roomsService.resortsChanged.subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
      }
    );
    this.resorts = this.roomsService.getResorts();
  }

  onNewResort() {}

}
