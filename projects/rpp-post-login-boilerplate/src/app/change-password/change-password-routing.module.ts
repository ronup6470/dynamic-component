/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for ChangePasswordModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { ChangePasswordFormContainerComponent } from './change-password-form-container/change-password-form-container.component';
const routes: Routes = [
  {
    path: '',
    component: ChangePasswordFormContainerComponent,
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }

