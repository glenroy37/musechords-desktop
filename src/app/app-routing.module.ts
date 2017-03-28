import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SheetComponent} from "./sheet/sheet.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'sheets', component: SheetComponent, canActivate: [LoginComponent]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
