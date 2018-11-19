export class RoomType {
  public id: number;
  public name: string;
  public url: string;
  public sleeps: number;

  constructor(id: number, name: string, url: string, sleeps: number) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.sleeps = sleeps;
  }
}
