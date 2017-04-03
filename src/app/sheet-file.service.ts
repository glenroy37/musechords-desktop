import { Injectable } from '@angular/core';
import {Sheet} from "musechords-core/dist/src/sheet";
import {ISheetFileService} from "musechords-core/dist/src/ISheetFileService";

declare let fs: any;
declare let homedir: any;

@Injectable()
export class SheetFileService implements ISheetFileService {

  static filename: string = homedir()+"/mclocal.json";
  static encoding: string = "utf8";
  static writeOptions: Object = {encoding: SheetFileService.encoding};

  constructor() {
    if(!fs.existsSync(SheetFileService.filename)){
      fs.writeFileSync(SheetFileService.filename, '[]');
    }
  }

  loadSheetsFromDisk(): Array<Sheet>{
    return JSON.parse(fs.readFileSync(SheetFileService.filename, SheetFileService.encoding));
  }

  writeSheetsToDisk(sheets: Array<Sheet>){
    fs.writeFile(SheetFileService.filename, JSON.stringify(sheets), SheetFileService.writeOptions);
  }
}
