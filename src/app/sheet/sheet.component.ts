///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Sheet} from "musechords-core/dist/src/sheet";
import {SheetService} from "musechords-core/dist/src/sheet.service";

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit, OnDestroy {

  offline: boolean;
  subscriptionToParameter: Subscription;
  sheets: Array<Sheet>;
  selectedSheet: Sheet;

  constructor(private route: ActivatedRoute, private sheetService: SheetService) { }

  ngOnInit() {
    this.subscriptionToParameter = this.route.params.subscribe(params => {
      this.offline = (params["offline"] == "true");
      this.sheetService.init(this.offline).then(()=>{
         this.reloadSheets();
      });
    });
    this.newSheet();
  }

  ngOnDestroy() {
    this.subscriptionToParameter.unsubscribe();
  }

  showSheet(sheet: Sheet): void{
    this.selectedSheet = sheet;
  }

  newSheet(): void{
    this.selectedSheet = new Sheet();
  }

  saveSheet(author: string, title: string, lyrics: string): void{
    if(this.offline == true){
      alert("You cannot edit Sheets while you are offline");
      return;
    }
    if(!this.selectedSheet.id) {
      this.sheetService.newSheet(new Sheet(author, title, lyrics)).then(() => {
        this.reloadSheets();
      });
    } else {
      this.selectedSheet.author = author;
      this.selectedSheet.title = title;
      this.selectedSheet.lyrics = lyrics;
      this.sheetService.saveSheet(this.selectedSheet).then(() => {
        this.reloadSheets();

      })
    }
  }

  deleteSheet(): void {
    if(this.offline == true){
      alert("You cannot delete Sheets while you are offline");
      return;
    }
    let toDelete: Sheet = this.selectedSheet;
    this.newSheet();
    this.sheetService.deleteSheet(toDelete).then(() => {
      this.reloadSheets();
    });
  }

  reloadSheets(): void{
    this.sheets = this.sheetService.getSheets();
  }

  transposeUp(lyrics:string): void{
    this.selectedSheet.lyrics = this.sheetService.transposeUp(lyrics);
  }

  transposeDown(lyrics: string): void{
    this.selectedSheet.lyrics = this.sheetService.transposeDown(lyrics);
  }
}
