import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TripsService} from '../trips.service';
import {BookableRoom} from '../../room-management/bookable-room.model';
import {Subscription} from 'rxjs';
import {Owner} from '../../shared/owner.model';
import {NgForm} from '@angular/forms';
import {Resort} from '../../room-management/resort.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit, OnDestroy {
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
    )
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
    const selectedResort = <HTMLOptionElement>resort[resort.selectedIndex];
    this.bookableRoomsFiltered = this.bookableRooms.filter(
      bookableRoom => bookableRoom.resort.name === selectedResort.label);
    // this.bookableRoomsFiltered.filter(br => br.resort.name === selectedResort.label);
  }

  onAddTrip(form) {
    const values = <NgForm>form.value;
    const newTrip = {
      'booked_date': new Date(values['booked_date']),
      'points_needed': values['points_needed'],
      'notes': values['notes'],
      'owner': {
        'name': values['owner']
      },
      'check_in_date': new Date(values['check_in_date']),
      'check_out_date': new Date(values['check_out_date']),
      'bookable_room': {
        'room_type': {
          'name': values['bookable_room_room']
        },
        'resort': {
          'name': values['bookable_room_resort']
        }
      }
    }
    console.log(newTrip);
    this.tripsService.addTrip(newTrip);
    this.activeModal.close('tripAdded');
  }

}
