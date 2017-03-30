import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Sheet} from "./sheet";
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";

declare let fs: any;

@Injectable()
export class SheetService {

  private sheets: Array<Sheet>;
  private offline: boolean;

  constructor(private http: Http,
              private apiService: ApiService) { }

  async init(offline: boolean): Promise<any>{
    this.offline = offline;
    if(offline == true){
      if(!fs.existsSync("muse.chords")){
        this.sheets = [];
        return null;
      } else {
        this.sheets = JSON.parse(fs.readFileSync("muse.chords", "utf-8"));
        return null;
      }
    } else {
      await this.http.get(this.apiService.getApiUrl()+"/sheets", {headers: ApiService.headers})
        .map(res => res.json()).subscribe(sheets =>
          this.sheets = sheets
        );
    }
  }

  getSheets(): Array<Sheet>{
    return this.sheets;
  }

  async newSheet(sheet: Sheet): Promise<any>{
    if(this.offline == true){
      return null;
    } else {
      await this.http.post(this.apiService.getApiUrl()+"/sheets", JSON.stringify(sheet), {headers: ApiService.headers}).map(res=>res.json()).subscribe(sheet=>{
        this.sheets.push(sheet);
      });
    }
  }

}
