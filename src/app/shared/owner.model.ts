import {OwnerEmail} from './owner-email.model';

export class Owner {
  private id: number;
  public emails: OwnerEmail[];

  constructor (public name: string) {}
}
