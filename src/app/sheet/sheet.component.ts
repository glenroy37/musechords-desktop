import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Sheet} from "../sheet";
import {SheetService} from "../sheet.service";

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
      this.offline = params["offline"];
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
    this.sheetService.newSheet(new Sheet(author, title, lyrics)).then(any => {
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
