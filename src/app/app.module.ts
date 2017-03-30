import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from "@angular/material";
import {ApiService} from "./api.service";
import {LoginService} from "./login.service";
import {ConfigurationService} from "./configuration.service";
import {SheetComponent} from "./sheet/sheet.component";
import {SheetService} from "./sheet.service";
import {CommonModule} from "@angular/common";
import {SheetFileService} from "./sheet-file.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule
  ],
  providers: [ApiService, LoginService, ConfigurationService, SheetService, SheetFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
