import { Injectable } from '@angular/core';

declare let fs: any;
declare let homedir: any;
@Injectable()
export class ConfigurationService {

  configuration: Object = {};
  static filename: string = homedir()+"/config.json";

  constructor() {
    if(fs.existsSync(ConfigurationService.filename)){
        this.configuration = JSON.parse(fs.readFileSync('/Users/mathias/config.json', 'utf8'));
    } else {
      this.write("apiUrl", "");
    }
  }

  write(key: string, value: string): void {
    this.configuration[key] = value;
    fs.writeFile(ConfigurationService.filename, JSON.stringify(this.configuration), function(err){
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
