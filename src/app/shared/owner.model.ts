import {OwnerEmail} from './owner-email.model';

export class Owner {

  constructor (public id: number, public name: string, public emails: OwnerEmail[]) {}
}
