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
  private static transposeCycleUp: Object = {
    "C": "C#",
    "C#": "D",
    "D": "D#",
    "D#": "E",
    "E": "F",
    "F": "F#",
    "F#": "G",
    "G": "G#",
    "G#": "A",
    "A": "A#",
    "A#": "B",
    "B": "C",
  };
  private static transposeCycleDown: Object = {
    "C":"B",
    "Db": "C",
    "D":"Db",
    "Eb":"D",
    "E":"Eb",
    "F":"E",
    "Gb":"F",
    "G":"Gb",
    "Ab":"G",
    "A":"Ab",
    "Bb":"A",
    "B":"Bb"
  };

  private static enharmonicEquivalents: Object = {
    "C#": "Db",
    "Db": "C#",
    "D#": "Eb",
    "Eb": "D#",
    "F#": "Gb",
    "Gb": "F#",
    "G#": "Ab",
    "Ab": "G#",
    "A#": "Bb",
    "Bb": "A#"
  };

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
              : SheetService.enharmonicEquivalents[line.charAt(i)+line.charAt(i+1)];

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
    return newLyrics;
  }

  transposeDown(lyrics:string): string{
    return this.transpose(lyrics, SheetService.transposeCycleDown, "b");
  }

  transposeUp(lyrics: string): string{
    return this.transpose(lyrics, SheetService.transposeCycleUp, "#");
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
