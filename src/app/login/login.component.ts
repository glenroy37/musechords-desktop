import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiUrl: string;

  constructor(private apiService: ApiService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.apiUrl = this.apiService.getApiUrl();
  }

  login(username: string, password: string, apiUrl: string){
    if(apiUrl != this.apiUrl){
      this.apiService.setApiUrl(apiUrl);
    }
    this.loginService.login(username, password).subscribe(res => {
      if(res["token"] != null){
        this.router.navigate(["/sheets"]);
      }
    });
  }

}
