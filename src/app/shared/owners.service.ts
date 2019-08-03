import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Owner} from './owner.model';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../gobals';

@Injectable()
export class OwnersService {
  private owners: Owner[];
  ownersChanged = new Subject<Owner[]>();
  ownerDetailsChanged = new Subject<Owner>();

  constructor(private http: HttpClient, private globals: Globals) {
  }

  getOwners() {
    this.http.get(this.globals.dvcApiServer + '/api/owners/').subscribe(
      (owners: Owner[]) => {
        this.owners = owners;
        this.ownersChanged.next(this.owners.slice());
      },

      (error: string) => {
        console.log(error);
      }
    );
  }

  getOwnerDetails(ownerId: number) {
    this.http.get(this.globals.dvcApiServer + '/api/owner_details/' + ownerId).subscribe(
      (ownerDetail: Owner) => {
          this.ownerDetailsChanged.next(ownerDetail);
      },

      (error: string) => {
        console.log(error);
      }
    );
  }

}
