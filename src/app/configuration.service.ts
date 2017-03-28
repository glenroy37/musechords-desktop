import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

declare let fs: any;
@Injectable()
export class ConfigurationService {

  configuration: Object = {};

  constructor() {
    fs.exists('config.json', (exists) =>{
      if(exists){
        fs.readFile('config.json', (err, data) => {
          if(err) throw err;
          this.configuration = JSON.parse(data);
        });
      }
    });
  }

  write(key: string, value: string): void {
    this.configuration[key] = value;
    fs.writeFile('config.json', JSON.stringify(this.configuration), function(err){
      if(err) throw err;
    })
  }

  exists(key): boolean{
    return this.configuration[key] != null;
  }

  read(key): string{
    return this.configuration[key]
  }

}
