import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicContainerComponent } from './dynamic-container/dynamic.container';

const routes: Routes = [
  {
    path: '',
    component: DynamicContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicComponentRoutingModule { }
