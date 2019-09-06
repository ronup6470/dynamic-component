import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// ---------------------------------- //
import { UserInfoPresenter } from '../user-info-presenter/user-info.presenter';
import { UserInfo } from './../../../dynamic.model';


@Component({
  selector: 'app-user-info-ui',
  templateUrl: './user-info.presentation.html',
  styleUrls: ['./user-info.presentation.scss'],
  viewProviders: [UserInfoPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoPresentationComponent {
  /**
   * User info of user info presentation component
   */
  public set userInfo(userInfo: UserInfo) {
    if (userInfo) {
      this._userInfo = userInfo;
      this.cdr.detectChanges();
    }
  };
  public get userInfo(): UserInfo {
    return this._userInfo;
  }
  // public userInfo: UserInfo;
  /**
   * User info of user info presentation component
   */
  private _userInfo: UserInfo;
  constructor(private cdr: ChangeDetectorRef) { }
}