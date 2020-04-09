import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {PointsService} from './points.service';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OwnersService} from '../shared/owners.service';
import {Owner} from '../shared/owner.model';


@Component({
  selector: 'app-point-management',
  templateUrl: './point-management.component.html',
  styleUrls: ['./point-management.component.css']
})
export class PointManagementComponent implements OnInit, OnDestroy {
  pointsSubscription: Subscription;
  bankPointsSubscription: Subscription;
  ownersSubscription: Subscription;
  ownerDetailsSubscription: Subscription;
  public points_to_bank = 0;
  public points_to_bank_max = 0;
  @ViewChild('form') myForm: NgForm;
  @ViewChild('contentConfirmBank') modalContentConfirmBank;
  public allOwners: Owner[];

  constructor(private pointsService: PointsService, private ownerService: OwnersService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.pointsSubscription = this.pointsService.availablePointsChanged.subscribe(
      (points: number) => {
        this.points_to_bank_max = points;
        this.points_to_bank = this.points_to_bank_max;
      }
    );
    this.bankPointsSubscription = this.pointsService.bankPointsComplete.subscribe(
      (result: Object) => {
        if (result['status'] === 201) {
          this.points_to_bank = 0;
          this.points_to_bank_max = 0;
          this.myForm.reset();
        }
      }
    );

    this.ownerService.getOwners();
    this.ownersSubscription = this.ownerService.ownersChanged.subscribe(
      (allOwners: Owner[]) => {
        this.allOwners = allOwners;
        for (const thisOwner of this.allOwners) {
          this.ownerService.getOwnerDetails(thisOwner.id);
        }
      }
    );

    this.ownerDetailsSubscription = this.ownerService.ownerDetailsChanged.subscribe(
      (ownerDetail: Owner) => {
        for (const thisOwner of this.allOwners) {
          if (thisOwner.id === ownerDetail.id) {
            thisOwner.bankedPoints = ownerDetail.bankedPoints;
            thisOwner.currentPoints = ownerDetail.currentPoints;
            thisOwner.borrowPoints = ownerDetail.borrowPoints;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.pointsSubscription.unsubscribe();
    this.bankPointsSubscription.unsubscribe();
    this.ownersSubscription.unsubscribe();
    this.ownerDetailsSubscription.unsubscribe();
  }

  onChangeBankDate(form) {
    const values = <NgForm>form.value;
    this.pointsService.getAvailablePoints(new Date(values['banked_date']));
  }

  onBankPoints(form) {

    this.modalService.open(this.modalContentConfirmBank).result.then(
      () => {
        const values = <NgForm>form.value;
        this.pointsService.bankPoints(new Date(values['banked_date']), this.points_to_bank);
      },
      () => {
      }
    );

  }


}
