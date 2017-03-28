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

  login(username: string, password: string): Observable<JSON> {
    let observable: Observable<JSON> =  this.http.post(this.apiService.getApiUrl()+"/token",
      {username: username, password: password}).map((response: Response)=> response.json());

    observable.subscribe(res => {
      if(res["token"] == null){
        throw new Error("Invalid Response from Server");
      }
      this.token = res["token"];
    });
    return observable;
  }


}
