
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to change-password.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

// ----------------------------------------------------------------- //
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordFormContainerComponent } from './change-password-form-container/change-password-form-container.component';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordAdapter } from './change-password-adapter/change-password-adapter';
import { ChangePasswordFormPresentationComponent } from './change-password-form-container/change-password-form-presentation/change-password-form-presentation.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/change-password/', '.json');
}

@NgModule({
  declarations: [
ChangePasswordFormContainerComponent,
ChangePasswordFormPresentationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ChangePasswordRoutingModule,
    NgbDropdownModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbAccordionModule,
    OverlayModule,
    TabsModule,
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
    ChangePasswordService,

ChangePasswordAdapter,


  ],
  entryComponents:[
    // DataFilterPresentationComponent,
  ],
})
export class ChangePasswordModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
     this.languageService.languageChange$.subscribe((lang: string) => {
      this.translate.use(lang);
    });
  }
}

