import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "musechords-core/dist/src/login.service";
import {ApiService} from "musechords-core/dist/src/api.service";

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

  login(username: string, password: string, apiUrl: string): void{
    if(apiUrl != this.apiUrl){
      this.apiService.setApiUrl(apiUrl);
    }
    if(username == "" || password == ""){
      alert("Please enter username and password");
    } else {
      this.loginService.login(username, password).then(() => {
          this.router.navigateByUrl("/sheets/false");
      });
    }
  }

  offline(): void {
    this.router.navigateByUrl("/sheets/true");
  }

  getApiUrl(): string{
    return this.apiUrl;
  }
}
