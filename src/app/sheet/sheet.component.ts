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
  }

  ngOnDestroy() {
    this.subscriptionToParameter.unsubscribe();
  }

  showSheet(sheet: Sheet): void{
    this.selectedSheet = sheet;
  }

  newSheet(sheet: Sheet): void{
    this.sheetService.newSheet(sheet).then(any => {
      this.reloadSheets();
    });
  }

  reloadSheets(): void{
    this.sheets = this.sheetService.getSheets();
  }

}
