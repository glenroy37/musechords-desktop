import { Component, OnInit } from '@angular/core';

declare let fs: any;
declare  let electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  ngOnInit(){

  }
}
