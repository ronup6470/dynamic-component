/**
 * @author Hem Chudgar.
 * @description Card view presentation component.
 */
import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { CustomerCardFormPresenter } from '../../customer-card-form-container/customer-card-form-presenter/customer-card-form-presenter';
import { Customer } from '../../customer.model';

/** Component */
@Component({
  selector: 'app-customer-card-view-presentation',
  templateUrl: './customer-card-view-presentation.component.html',
  styleUrls: ['./customer-card-view-presentation.component.scss'],
  viewProviders: [CustomerCardFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardViewPresentationComponent implements OnDestroy {

  /** Initialize date picker config */
  public bsConfig: BsDatepickerConfig;

  /** Destroy subject */
  private destroy: Subject<void>;

  /** Customer property  */
  private _customer: Customer;

  /** This will set the data */
  @Input() public set customer(value: Customer) {
    if (value) {
      this._customer = value;
    }
  }

  public get customer(): Customer {
    return this._customer
  }

  constructor() {
    this.destroy = new Subject();
    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;
    this._customer = new Customer();
  }

  /**
   * On destroy
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
