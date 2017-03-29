import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable()
export class LoginService {

  token: string;

  constructor(private http: Http, private apiService: ApiService) { }

  getToken(): string{
    return this.token;
  }

  login(username: string, password: string): Promise<string> {
    let promise = new Promise<string>((resolve) => {
      this.http.post(this.apiService.getApiUrl()+"/token", {username: username, password: password})
        .map((response: Response)=> response.json()).subscribe(res => {
        if(res["token"] == null){
          throw new Error("Invalid Response from Server");
        }
        ApiService.headers.append('token', res["token"]);
        this.token = res["token"];
        resolve(this.token);
      });
    });
    return promise;
  }


}
