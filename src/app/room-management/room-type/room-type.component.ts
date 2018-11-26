import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {RoomsService} from '../rooms.service';
import {RoomType} from '../room-type.model';
import {NgForm} from '@angular/forms';
import {RoomTypeCollection} from './room-type-collection.model';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit, OnDestroy {
  allowDelete = false;
  roomTypeCollection: RoomTypeCollection[] = [];
  subscription: Subscription;
  activeResortSelection = false;
  @Output() roomTypeSelected = new EventEmitter<RoomType>();
  constructor(private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.subscription = this.roomsService.roomTypesChanged.subscribe(
      (roomTypes: RoomType[]) => {
        this.roomTypeCollection = [];
        for (const currentRoomType of roomTypes) {
          this.roomTypeCollection.push(
            new RoomTypeCollection(currentRoomType, false));
        }
      }
    );
    this.roomsService.getRoomTypes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditRoomTypes() {
    this.allowDelete = !this.allowDelete;
  }

  onAddRoomType(form: NgForm) {
    const value = form.value;
    const newRoomTypeName = value.newRoomTypeName;
    const newRoomTypeSleeps = value.newRoomTypeSleeps;
    this.roomsService.addRoomType(newRoomTypeName, newRoomTypeSleeps);
    form.reset();
  }

  onDeleteRoomType(roomTypeId: number) {
    this.roomsService.removeRoomType(roomTypeId);
    this.allowDelete = false;
  }

  selectedResortChange(selectedRoomTypeIds: number[]) {
    for (const x of this.roomTypeCollection) {x.activeSelection = false; }
    for (const currentRoomTypeCollection of this.roomTypeCollection) {
      for (const currentRoomTypeId of selectedRoomTypeIds) {
        if (currentRoomTypeId === currentRoomTypeCollection.roomType.id) {
          currentRoomTypeCollection.activeSelection = true;
        }
      }
    }
  }

  onSelectRoomType(roomTypeMember: RoomType) {
    this.roomTypeSelected.emit(roomTypeMember);
  }

}
