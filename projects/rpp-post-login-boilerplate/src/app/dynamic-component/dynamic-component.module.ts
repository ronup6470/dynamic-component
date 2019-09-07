import { CustomerListPresentationComponent } from './dynamic-container/dynamic-presentation/customer-list-presentation/customer-list.presentation';
import { CustomerFormPresentationComponent } from './dynamic-container/dynamic-presentation/customer-form-presentation/customer-form.presentation';
import { DynamicComponentService } from './dynamic-component.service';
import { DynamicPresentationComponent } from './dynamic-container/dynamic-presentation/dynamic.presentation';
import { DynamicContainerComponent } from './dynamic-container/dynamic.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentRoutingModule } from './dynamic-component-routing.module';
import { UserInfoPresentationComponent } from './dynamic-container/dynamic-presentation/user-info-presentation/user-info.presentation';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule, LanguageDataService } from 'common-libs';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// ----------------------------------------------------------------- //

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/customer/', '.json');
}
@NgModule({
  declarations: [
    DynamicContainerComponent,
    DynamicPresentationComponent,
    UserInfoPresentationComponent,
    CustomerFormPresentationComponent,
    CustomerListPresentationComponent
  ],
  imports: [
    BsDatepickerModule,
    CommonModule,
    DynamicComponentRoutingModule,
    PortalModule,
    OverlayModule,
    SharedModule,
    NgSelectModule,
    PortalModule,
    OverlayModule,
    NgbDropdownModule,
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
    DynamicComponentService
  ],
  entryComponents: [
    UserInfoPresentationComponent,
    CustomerFormPresentationComponent,
    CustomerListPresentationComponent
  ]
})
export class DynamicComponentModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
    this.languageService.languageChange$.subscribe((lang: string) => {
      if (lang !== null) {
        this.translate.use(lang);
      }
    });
  }
}
