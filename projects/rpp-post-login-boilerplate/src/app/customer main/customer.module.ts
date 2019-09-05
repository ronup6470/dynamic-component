import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListCardViewContainerComponent } from './customer-list-card-view-container.component';
import { CustomerListCardContainerComponent } from './customer-list-card-container/customer-list-card-container.component';
// tslint:disable-next-line:max-line-length
import { CustomerListCardPresentationComponent } from './customer-list-card-container/customer-list-card-presentation/customer-list-card-presentation.component';
import { CustomerCardViewContainerComponent } from './customer-card-view-container/customer-card-view-container.component';
// tslint:disable-next-line:max-line-length
import { CustomerCardViewPresentationComponent } from './customer-card-view-container/customer-card-view-presentation/customer-card-view-presentation.component';
import { CustomerCardFormContainerComponent } from './customer-card-form-container/customer-card-form-container.component';
// tslint:disable-next-line:max-line-length
import { CustomerCardFormPresentationComponent } from './customer-card-form-container/customer-card-form-presentation/customer-card-form-presentation.component';
import { CustomerService } from './customer.service';
import { CustomerAdapter, CustomerListAdapter } from './customer-adapter/customer-adapter';
import { SharedModule } from 'common-libs';

/** This function gets multilingual file */
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/customer/', '.json');
}

/**
 * Module
 */
@NgModule({
  declarations: [
    CustomerListCardViewContainerComponent,
    CustomerListCardContainerComponent,
    CustomerListCardPresentationComponent,
    CustomerCardViewContainerComponent,
    CustomerCardViewPresentationComponent,
    CustomerCardFormContainerComponent,
    CustomerCardFormPresentationComponent],
  imports: [
    BsDatepickerModule,
    SharedModule,
    CustomerRoutingModule,
    NgSelectModule,
    PortalModule,
    OverlayModule,
    CommonModule,
    NgbDropdownModule,
    InfiniteScrollModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [
    CustomerService,
    CustomerAdapter,
    CustomerListAdapter
  ],
})
export class CustomerModule { }
