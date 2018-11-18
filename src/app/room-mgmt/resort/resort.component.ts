import { Component, OnInit } from '@angular/core';
import {Resort} from '../resort.model';
import {Subscription} from 'rxjs';
import {RoomsService} from '../rooms.service';

@Component({
  selector: 'app-resort',
  templateUrl: './resort.component.html',
  styleUrls: ['./resort.component.css']
})
export class ResortComponent implements OnInit {

  resorts: Resort[] = [];
  subscription: Subscription;

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.subscription = this.roomsService.resortsChanged.subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
      }
    );
    this.roomsService.getResorts();
  }

  onNewResort() {}

}
