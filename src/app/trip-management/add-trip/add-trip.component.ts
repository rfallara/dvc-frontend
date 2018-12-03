import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TripsService} from '../trips.service';
import {BookableRoom} from '../../room-management/bookable-room.model';
import {Subscription} from 'rxjs';
import {Owner} from '../../shared/owner.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit, OnDestroy {
  public bookableRooms: BookableRoom[];
  public bookableRoomsFiltered: BookableRoom[];
  private bookableRoomSubscription: Subscription;
  public owners: Owner[];
  private ownersSubscription: Subscription;
  public ownersLoading: boolean;
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
    this.bookableRoomSubscription.unsubscribe();
  }

  onResortChange(resort) {
    const selectedResort = <HTMLOptionElement>resort[resort.selectedIndex];
    this.bookableRoomsFiltered = this.bookableRooms.filter(
      bookableRoom => bookableRoom.resort.name === selectedResort.label);
    // this.bookableRoomsFiltered.filter(br => br.resort.name === selectedResort.label);
  }

}
