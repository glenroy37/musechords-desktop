import { Injectable } from '@angular/core';
import {Sheet} from "./sheet";

declare let fs: any;

@Injectable()
export class SheetFileService {

  static filename: string = "mclocal.json";
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
