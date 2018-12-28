import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TripsService} from './trips.service';
import {Subscription} from 'rxjs';
import {Trip} from './trip.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddTripComponent} from './add-trip/add-trip.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {BookableRoom} from '../room-management/bookable-room.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-trip-management',
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.css']
})
export class TripManagementComponent implements OnInit, OnDestroy, AfterViewInit {
  private tripsSubscription: Subscription;
  public trips: Trip[];
  displayedColumns: string[] = ['booked_date', 'check_in_date', 'check_out_date',
    'owner', 'resort', 'room_type', 'notes', 'points', 'delete'];
  dataSource =  new MatTableDataSource<Trip>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  isLoading = true;

  constructor(private tripsService: TripsService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.spinner.show();
    this.tripsService.getTrips();
    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (trips: Trip[]) => {
        this.trips = trips;
        this.dataSource.data = trips;
        this.spinner.hide();
        this.isLoading = false;
      },
      (error: string) => {
        console.log(error);
        this.spinner.hide();
        this.isLoading = false;
      }
    );

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'owner' : return item.owner.name;
        default: return item[property];
      }
    };

    this.dataSource.filterPredicate = (data: Trip, filter: string) => {
      const searchString = data.owner.name + data.bookable_room.resort.name + data.bookable_room.room_type.name +
        data.notes + data.points_needed.toString();

      if (searchString.toLowerCase().search(filter) >= 0) {
        return true;
      } else {
        return false;
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorter;
  }

  ngOnDestroy() {
    this.tripsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddNewTrip() {
    const modalRef = this.modalService.open(AddTripComponent);
    modalRef.result.then(
      (modalResult) => {
        const value = modalResult.value;
        console.log(value);
      }
    );
  }

  onTripDelete(tripId: number) {
    this.tripsService.removeTrip(tripId);
  }
}
