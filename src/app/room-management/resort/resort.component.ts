import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Resort} from '../resort.model';
import {Subscription} from 'rxjs';
import {RoomsService} from '../rooms.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-resort',
  templateUrl: './resort.component.html',
  styleUrls: ['./resort.component.css']
})
export class ResortComponent implements OnInit, OnDestroy {
  allowDelete = false;
  resorts: Resort[] = [];
  subscription: Subscription;
  selectedResort: Resort;
  @Output() resortSelected = new EventEmitter<Resort>();

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.subscription = this.roomsService.resortsChanged.subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
      }
    );
    this.roomsService.getResorts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditResorts() {
    this.onChangeSelectedResort(undefined);
    this.allowDelete = !this.allowDelete;
  }

  onAddResort(form) {
    const value = form.value;
    const newResortName = value.newResortName;
    this.roomsService.addResort(newResortName);
    form.reset();
  }

  onDeleteResort(resortId: number) {
    this.roomsService.removeResort(resortId);
    this.allowDelete = false;
  }

  onChangeSelectedResort(newSelectedResort: Resort) {
    if (this.allowDelete) { return; }
    if (this.selectedResort === undefined || newSelectedResort === undefined) {
      this.selectedResort = newSelectedResort;
      this.resortSelected.emit(newSelectedResort);
    } else if (this.selectedResort.id === newSelectedResort.id) {
      this.selectedResort = undefined;
      this.resortSelected.emit(null);
    } else {
      this.selectedResort = newSelectedResort;
      this.resortSelected.emit(newSelectedResort);
    }
  }

  getSelectedColor(resortId: number) {
    if (this.selectedResort === undefined) { return ''; }
    if (resortId === this.selectedResort.id) {
    return '#007bff';
    } else {
    return '';
    }
  }
}
