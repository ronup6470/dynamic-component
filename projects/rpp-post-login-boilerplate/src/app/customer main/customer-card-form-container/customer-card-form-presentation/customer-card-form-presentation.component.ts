/**
 * @author Hem Chudgar.
 * @description Card form presentation component.
 */
import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//---------------------------------------------------------------------//
import { Customer } from '../../customer.model';
import { CustomerCardFormPresenter } from '../customer-card-form-presenter/customer-card-form-presenter';

/** Component */
@Component({
  selector: 'app-customer-card-form-presentation',
  templateUrl: './customer-card-form-presentation.component.html',
  styleUrls: ['./customer-card-form-presentation.component.scss'],
  viewProviders: [CustomerCardFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardFormPresentationComponent implements OnInit, OnDestroy {
  /** Create form group */
  public customerFormGroup: FormGroup;
  
  /** Event emmiter for add */
  @Output() public add: EventEmitter<Customer>;
  /** Event emitter for update */
  @Output() public  update: EventEmitter<Customer>;
  /** Set boolan for form submitted */
  public isFormSubmitted: boolean = false;
  /** Config for date picker */
  public bsConfig: BsDatepickerConfig;
  /** Subject for destroy */
  private destroy: Subject<void>;
  /** Property for setter */
  private _customer: Customer;

  /** This will set the data */
  @Input() public set customer(value: Customer) {
    this._customer = value;
    if (value) {
      this.customerFormGroup = this.customerPresentor.bindControlValue(this.customerFormGroup, this._customer);
    }
  }

  public get customer(): Customer {
    return this._customer
  }

  constructor(private customerPresentor: CustomerCardFormPresenter) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();

    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;

    this.customerFormGroup = this.customerPresentor.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.customerPresentor.add$.pipe(takeUntil(this.destroy)).subscribe((customer: Customer) => {
      if (this.customer) {
        this.update.emit(customer);
      } else {
        this.add.emit(customer);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveCustomer(): void {
    this.isFormSubmitted = true;
    this.customerPresentor.saveCustomer(this.customerFormGroup);
  }
}
