import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SheetComponent} from "./sheet/sheet.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'sheets', component: SheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SheetComponent]
})
export class AppRoutingModule { }
