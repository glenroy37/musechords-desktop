import { Injectable } from '@angular/core';
import {ConfigurationService} from "./configuration.service";

@Injectable()
export class ApiService {
  static configKey: string = "apiUrl";
  apiUrl: string;

  constructor(private configurationService: ConfigurationService) {}

  setApiUrl(apiUrl: string): void {
    this.apiUrl = apiUrl;
    this.configurationService.write(ApiService.configKey, apiUrl);
  }

  getApiUrl(): string{
    if(this.apiUrl == null){
      if(this.configurationService.exists(ApiService.configKey)){
        this.apiUrl = this.configurationService.read(ApiService.configKey);
      }
    }
    return this.apiUrl;
  }
}
