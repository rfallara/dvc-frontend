export class EventLog {
  constructor(public timestamp: Date, public url: string, public description: string,
              public id: number, public google_id: string) {
  }
}

export class EventsPager {

  public items: EventLog[];
  public pages: number;
  public current_page: number;
  public has_next: boolean;
  public has_prev: boolean;
  public next_page: number;
  public prev_page: number;
  public collection_size: number;

  constructor() {
  }
}
