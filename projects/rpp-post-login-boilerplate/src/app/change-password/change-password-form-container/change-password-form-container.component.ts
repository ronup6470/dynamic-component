/**
 * @name ChangePasswordContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for ChangePassword. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { AuthService } from 'common-libs';
import { ChangePasswordService } from '../change-password.service';
import { ChangePassword } from '../change-password.model';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-password-form-container',
  templateUrl: './change-password-form-container.component.html'
})
export class ChangePasswordFormContainerComponent {

  constructor(
    private toasterService: ToastrService,
    private changePasswordService: ChangePasswordService,
    private authService: AuthService,
    private oidcFacade: OidcFacade,
    private translate: TranslateService
  ) {

  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateChangePassword(changePassword: ChangePassword): void {

    this.authService.getUserData().subscribe((userData: User) => {
      this.changePasswordService.updateChangePassword(userData.profile.sub, changePassword).subscribe(response => {
        if (response) {
          this.toasterService.success('Password changed successfully.');
        }
        this.oidcFacade.signoutRedirect();
      }, (err: HttpErrorResponse) => {

        for (const iterator of err.error.errors) {
          // this.toasterService.error(iterator.Error);
          this.toasterService.error(this.translate.instant(iterator.Error));
        }
      });
    })


  }
}
