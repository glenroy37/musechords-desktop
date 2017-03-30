export class Sheet {
  public id?: number;
  public capo?: number;
  public author: string;
  public title: string;
  public timesig?: string;
  public transpose?: number;
  public lyrics: string;

  constructor(author: string = "", title: string = "", lyrics:string = ""){
    this.author = author;
    this.title = title;
    this.lyrics = lyrics;
    this.transpose = 0;
  }
}
