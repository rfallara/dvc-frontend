import {OwnerEmail} from './owner-email.model';

export class Owner {
  public id: number;
  public email: OwnerEmail[];
  public bankedPoints: number;
  public currentPoints: number;
  public borrowPoints: number;

  constructor (public name: string) {}
}
