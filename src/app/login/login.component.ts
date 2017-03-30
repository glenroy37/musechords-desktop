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

  login(username: string, password: string, apiUrl: string): void{
    if(apiUrl != this.apiUrl){
      this.apiService.setApiUrl(apiUrl);
    }
    if(username == "" || password == ""){
      alert("Please enter username and password");
    } else {
      this.loginService.login(username, password).then(() => {
          this.router.navigateByUrl("/sheets/0");
      });
    }
  }

  offline(): void {
    this.router.navigateByUrl("/sheets/1");
  }

  getApiUrl(): string{
    return this.apiUrl;
  }
}
