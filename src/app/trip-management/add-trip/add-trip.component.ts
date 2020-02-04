import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TripsService} from '../trips.service';
import {BookableRoom} from '../../room-management/bookable-room.model';
import {Subscription} from 'rxjs';
import {Owner} from '../../shared/owner.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Resort} from '../../room-management/resort.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit, OnDestroy {
  addTripForm: FormGroup;
  bookableRoomRoom: FormControl;

  public resorts: Resort[];
  private resortsSubscription: Subscription;
  public bookableRooms: BookableRoom[];
  public bookableRoomsFiltered: BookableRoom[];
  private bookableRoomSubscription: Subscription;
  public owners: Owner[];
  private ownersSubscription: Subscription;
  public ownersLoading: boolean;
  public resortsLoading: boolean;
  public bookableRoomsLoading: boolean;

  constructor(public activeModal: NgbActiveModal, private tripsService: TripsService) {}

  ngOnInit() {

    this.bookableRoomRoom = new FormControl(null);

    this.addTripForm = new FormGroup({
      'booked_date': new FormControl(null),
      'points_needed': new FormControl(null),
      'check_in_date': new FormControl(null),
      'check_out_date': new FormControl(null),
      'owner': new FormControl({value: null, disabled: this.ownersLoading}),
      'bookable_room_resort': new FormControl({value: null, disabled: this.resortsLoading || this.bookableRoomsLoading}),
      'bookable_room_room': new FormControl({value: null, disabled: this.resortsLoading || this.bookableRoomsLoading}),
      'notes': new FormControl(null)
    });



    this.ownersLoading = true;
    this.tripsService.getOwners();
    this.ownersSubscription = this.tripsService.ownersChanged.subscribe(
      (owners: Owner[]) => {
        this.owners = owners;
        this.ownersLoading = false;
      }
    );
    this.resortsLoading = true;
    this.tripsService.getResorts();
    this.resortsSubscription = this.tripsService.resortsChanged.subscribe(
      (resorts: Resort[]) => {
        this.resorts = resorts;
        this.resortsLoading = false;
      }
    );
    this.bookableRoomsLoading = true;
    this.tripsService.getBookableRooms();
    this.bookableRoomSubscription = this.tripsService.bookableRoomsChanged.subscribe(
      (bookableRooms: BookableRoom[]) => {
        this.bookableRooms = bookableRooms;
        this.bookableRoomsLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.ownersSubscription.unsubscribe();
    this.bookableRoomSubscription.unsubscribe();
    this.resortsSubscription.unsubscribe();
  }

  onResortChange(resort) {
    this.bookableRoomsFiltered = this.bookableRooms.filter(
      bookableRoom => bookableRoom.resort.name === resort.value);
  }

  onAddTrip() {
    const newTrip = {
      'booked_date': new Date(this.addTripForm.get('booked_date').value),
      'points_needed': this.addTripForm.get('points_needed').value,
      'notes': this.addTripForm.get('notes').value,
      'owner': {
        'name': this.addTripForm.get('owner').value
      },
      'check_in_date': new Date(this.addTripForm.get('check_in_date').value),
      'check_out_date': new Date(this.addTripForm.get('check_out_date').value),
      'bookable_room': {
        'room_type': {
          'name': this.addTripForm.get('bookable_room_room').value
        },
        'resort': {
          'name': this.addTripForm.get('bookable_room_resort').value
        }
      }
    }
    console.log(newTrip);
    this.tripsService.addTrip(newTrip);
    this.activeModal.close('tripAdded');
    console.log(this.addTripForm);
  }

}
