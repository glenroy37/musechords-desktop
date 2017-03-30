import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Sheet} from "./sheet";
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";
import {SheetFileService} from "./sheet-file.service";

declare let fs: any;

@Injectable()
export class SheetService {

  private sheets: Array<Sheet>;
  private offline: boolean;

  constructor(private http: Http,
              private apiService: ApiService,
              private sheetFileService: SheetFileService) { }

  async init(offline: boolean): Promise<any>{
    return new Promise<any>((resolve) => {
      if (offline == true) {
        this.sheets = this.sheetFileService.loadSheetsFromDisk();
        resolve(null);
      } else {
        this.http.get(this.apiService.getApiUrl() + "/sheets", {headers: ApiService.headers})
          .map(res => res.json()).subscribe(sheets =>{
            this.sheets = sheets;
            resolve(null);
            this.sheetFileService.writeSheetsToDisk(this.sheets);
          });
      }
    });
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
        this.sheetFileService.writeSheetsToDisk(this.sheets);
      });
    }
  }

}
