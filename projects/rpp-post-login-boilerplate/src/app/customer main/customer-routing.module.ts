import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListCardViewContainerComponent } from './customer-list-card-view-container.component';
import { CustomerCardFormContainerComponent } from './customer-card-form-container/customer-card-form-container.component';
import { CustomerCardViewContainerComponent } from './customer-card-view-container/customer-card-view-container.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListCardViewContainerComponent,
    children: [
      {
        path: 'view/:id',
        component: CustomerCardViewContainerComponent
      },
      {
        path: 'add',
        component: CustomerCardFormContainerComponent
      },
      {
        path: 'edit/:id',
        component: CustomerCardFormContainerComponent
      }
    ]
  }
];

/** Router module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
