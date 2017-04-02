import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Sheet} from "./sheet";
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";
import {SheetFileService} from "./sheet-file.service";
import TransposeCycle from "./TransposeCycle";

declare let fs: any;

@Injectable()
export class SheetService {

  private sheets: Array<Sheet>;
  private offline: boolean;

  constructor(private http: Http,
              private apiService: ApiService,
              private sheetFileService: SheetFileService) { }

  init(offline: boolean): Promise<any>{
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

  transpose(lyrics: string, transposeCycle: Object, enharmonicChecker: string){
    let newLines: string[] = [];

    //Look at all lines
    let lines: string[] = lyrics.split("\n");
    lines.forEach(line => {
      //If this line isn't a chord lines, pass it to the new ones without change
      if(!(line.startsWith(".") || line.startsWith("·"))){
        newLines.push(line);
      } else {
        let newLine: string = "";

        //Iterate over all characters in that line
        for(let i = 0; i < line.length; i++){
          //If the current character is a whitespace, jump to the next character
          if(line.charAt(i) == " " || line.charAt(i) == "." || line.charAt(i) == "·"){
            newLine += line.charAt(i);
            continue;
          }

          //If we have a two-char chord, remember that
          let twoCharChord: boolean = line.charAt(i+1) == "b" || line.charAt(i+1) == "#";


          //If the chord isn't a two-char chord use the chord.
          //If the chord is a two-char chord, use the chord, if it's a b-chord, otherwise use the enharmonic equivalent.
          let chord = (twoCharChord == false) ? line.charAt(i) :
            (line.charAt(i+1) == enharmonicChecker) ? line.charAt(i)+line.charAt(i+1)
              : TransposeCycle.enharmonicEquivalents[line.charAt(i)+line.charAt(i+1)];

          //If chord is a valid, transposable chord
          if(transposeCycle[chord] != null){
            //Append the new Chord
            let newChord: string =  transposeCycle[chord];
            newLine += newChord;


            if(twoCharChord == true) {
              //If our old chord was a two-char chord and there was an appendance behind it
              if (line.charAt(i + 2) != " "){
                let appendance: string = "";
                //Jump to appendance
                i += 2;
                //fetch Appendance
                for (; i < line.length && line.charAt(i) != " "; i++) {
                  appendance += line.charAt(i);
                }
                //Add appendance to line
                newLine += appendance+ " ";
              }
              //Fill up the missing character
              newLine += " ";
            } else {
              //If our old chord wasn't a two-char chord and there was an appendance behind it
              if(line.charAt(i+1) != " "){
                let appendance: string = "";
                //Jump to appendance
                i += 1;
                //fetch Appendance
                for (; i < line.length && line.charAt(i) != " "; i++) {
                  appendance += line.charAt(i);
                }
                newLine+= appendance + " ";

              }
              //If the new one is a two-char chord, but the old one wasn't
              if(newChord.length > 1) {
                i++; //Skip one character, because there is a new one in this chord
              }
            }
          }
        }

        newLines.push(newLine);
      }
    });

    //Return all new Lines
    let newLyrics: string = "";
    newLines.forEach(line => {
      newLyrics+=line+"\n";
    });
    //Remove last LF
    newLyrics = newLyrics.slice(0, -1);
    return newLyrics;
  }

  transposeDown(lyrics:string): string{
    return this.transpose(lyrics, TransposeCycle.cycleDown, "b");
  }

  transposeUp(lyrics: string): string{
    return this.transpose(lyrics, TransposeCycle.cycleUp, "#");
  }

  async newSheet(sheet: Sheet): Promise<any>{
    if(this.offline == true){
      return null;
    } else {
      await this.http.post(this.apiService.getApiUrl() + "/sheets", JSON.stringify(sheet), {headers: ApiService.headers}).map(res => res.json()).subscribe(sheet => {
        this.sheets.push(sheet);
        this.sheetFileService.writeSheetsToDisk(this.sheets);
      });
    }
  }

  async saveSheet(sheet: Sheet): Promise<any>{
    if(this.offline == true){
      return null;
    } else {
      await this.http.put(this.apiService.getApiUrl() + "/sheets/" + sheet.id, JSON.stringify(sheet), {headers: ApiService.headers}).map(res => res.json()).subscribe(affected => {
        this.sheets[this.sheets.findIndex((element) => {
          return element.id == sheet.id;
        })] = sheet;
      });
    }
  }

  async deleteSheet(sheet: Sheet): Promise<any>{
    if(this.offline == true){
      return null;
    } else {
      await this.http.delete(this.apiService.getApiUrl() + "/sheets/" + sheet.id, {headers: ApiService.headers}).map(res => res.json()).subscribe(() => {
        this.sheets.splice(this.sheets.indexOf(sheet));
      });
    }
  }

}
