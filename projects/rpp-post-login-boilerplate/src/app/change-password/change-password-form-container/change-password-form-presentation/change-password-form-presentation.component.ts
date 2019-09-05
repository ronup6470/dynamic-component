

/**
 * @name ChangePasswordPresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for change-passwordwhich contains the ui and business logic
 */

import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { ChangePasswordFormPresenter } from '../change-password-form-presenter/change-password-form-presenter';
import { ChangePassword} from '../../change-password.model';


@Component({
  selector: 'app-change-password-form-ui',
  templateUrl: './change-password-form-presentation.component.html',
  styleUrls: ['./change-password-form-presentation.component.scss'],
  viewProviders: [ChangePasswordFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordFormPresentationComponent implements OnInit, OnDestroy {

  @Output() update: EventEmitter<ChangePassword>;
  public changePasswordFormGroup: FormGroup;

  public isFormSubmitted: boolean = false;
  private destroy: Subject<void>;


  constructor(private changePasswordPresentor: ChangePasswordFormPresenter) {
    this.destroy = new Subject();
    this.update = new EventEmitter();
    this.changePasswordFormGroup = this.changePasswordPresentor.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.changePasswordPresentor.add$.pipe(takeUntil(this.destroy)).subscribe((changePassword: ChangePassword) =>
    {
      if(changePassword){
          this.update.emit(changePassword);
      } 
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveChangePassword(): void {
    this.isFormSubmitted = true;
    this.changePasswordPresentor.saveChangePassword(this.changePasswordFormGroup);
  }

}

