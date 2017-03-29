import { Injectable } from '@angular/core';

declare let fs: any;
@Injectable()
export class ConfigurationService {

  configuration: Object = {};


  constructor() {
    if(fs.existsSync('config.json')){
        this.configuration = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    }
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
    return this.configuration[key];
  }



}
