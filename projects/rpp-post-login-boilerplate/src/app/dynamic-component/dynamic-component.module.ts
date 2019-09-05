import { DynamicPresentationComponent } from './dynamic-container/dynamic-presentation/dynamic.presentation';
import { DynamicContainerComponent } from './dynamic-container/dynamic.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentRoutingModule } from './dynamic-component-routing.module';

@NgModule({
  declarations: [
    DynamicContainerComponent,
    DynamicPresentationComponent
  ],
  imports: [
    CommonModule,
    DynamicComponentRoutingModule
  ]
})
export class DynamicComponentModule { }
