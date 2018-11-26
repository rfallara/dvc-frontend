import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {RoomsService} from '../rooms.service';
import {RoomType} from '../room-type.model';
import {RoomTypeCollection} from './room-type-collection.model';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit, OnDestroy {
  roomTypeCollection: RoomTypeCollection[] = [];
  subscription: Subscription;
  activeResortSelection = false;
  activeEditRoomType: RoomType;
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

  onAddRoomType(form) {
    const value = form.value;
    const newRoomTypeName = value.newRoomTypeName;
    const newRoomTypeSleeps = value.newRoomTypeSleeps;
    this.roomsService.addRoomType(newRoomTypeName, newRoomTypeSleeps);
    form.reset();
  }

  onDeleteRoomType(roomTypeId: number) {
    this.roomsService.removeRoomType(roomTypeId);
  }

  selectedResortChange(selectedRoomTypeIds: number[]) {
    this.activeEditRoomType = null;
    for (const x of this.roomTypeCollection) {
      x.activeSelection = false;
    }
    for (const currentRoomTypeCollection of this.roomTypeCollection) {
      for (const currentRoomTypeId of selectedRoomTypeIds) {
        if (currentRoomTypeId === currentRoomTypeCollection.roomType.id) {
          currentRoomTypeCollection.activeSelection = true;
        }
      }
    }
  }

  onSelectRoomType(roomTypeMember: RoomType) {
    if (this.activeResortSelection) {
      this.roomTypeSelected.emit(roomTypeMember);
    } else {
      if (this.checkActiveEditRoomType(roomTypeMember)) {
        this.activeEditRoomType = null;
      } else {
        this.activeEditRoomType = roomTypeMember;
      }
    }
  }

  checkActiveEditRoomType(roomType: RoomType) {
    if (this.activeEditRoomType === undefined || this.activeEditRoomType === null) {
      return false;
    }
    return this.activeEditRoomType.id === roomType.id;
  }

  checkNewRoomTypeFormEnable() {
    let formEnabled = true;
    if (!(this.activeEditRoomType === null || this.activeEditRoomType === undefined)) {
      formEnabled = false;
    }
    if (this.activeResortSelection) {
      formEnabled = false;
    }
    return formEnabled;
  }
}
