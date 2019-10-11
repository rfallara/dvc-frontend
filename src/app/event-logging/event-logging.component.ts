import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService} from './events.service';
import {Subscription} from 'rxjs';
import {EventLog, EventsPager} from './event.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-logging',
  templateUrl: './event-logging.component.html',
  styleUrls: ['./event-logging.component.css']
})
export class EventLoggingComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  public eventPager: EventsPager;
  private currentPage;
  private perPage;
  private collectionSize;

  constructor(private eventService: EventsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.eventPager = new EventsPager();
    this.currentPage = 1;
    this.collectionSize = 0;
    this.perPage = 10;
    this.eventService.getEvents(this.currentPage, this.perPage);
    this.eventsSubscription = this.eventService.eventLogChanged.subscribe(
      (eventPager: EventsPager) => {
        this.eventPager = eventPager;
        this.collectionSize = eventPager.collection_size;
      }
    );
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.eventService.getEvents(this.currentPage, this.perPage);
  }

  onPerPageChange(newPerPage) {
    this.perPage = +newPerPage;
    this.eventService.getEvents(this.currentPage, this.perPage);
  }
}
