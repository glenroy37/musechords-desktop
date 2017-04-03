import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from "@angular/material";
import {ConfigurationService} from "./configuration.service";
import {SheetComponent} from "./sheet/sheet.component";
import {CommonModule} from "@angular/common";
import {SheetFileService} from "./sheet-file.service";
import {LoginService} from "musechords-core/dist/src/login.service";
import {ApiService} from "musechords-core/dist/src/api.service";
import {SheetService} from "musechords-core/dist/src/sheet.service";

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
  providers: [ApiService, LoginService, SheetService, {
    provide:"IConfigurationService", useClass:ConfigurationService
  }, {
    provide:"ISheetFileService", useClass:SheetFileService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
