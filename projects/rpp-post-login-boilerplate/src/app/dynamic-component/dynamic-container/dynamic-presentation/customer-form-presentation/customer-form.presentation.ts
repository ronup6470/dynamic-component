


import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { CustomerFormPresenter } from '../customer-form-presenter/customer-form.presenter';
import { Customer, City, Office } from '../../../dynamic.model';


@Component({
  selector: 'app-customer-form-ui',
  templateUrl: './customer-form.presentation.html',
  styleUrls: ['./customer-form.presentation.scss'],
  viewProviders: [CustomerFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFormPresentationComponent implements OnInit, OnDestroy {

  /*** Customer form group of customer form presentation component */
  public customerFormGroup: FormGroup;
  public isFormSubmitted: boolean = false;
  public bsConfig: BsDatepickerConfig;
  public selectedCity$: Observable<string>;
  private selectedCity: Subject<string>;
  /*** Sets cities */
  public set cities(cities: City[]) {
    if (cities) {
      this._cities = cities;
    }
  }
  public get cities(): City[] {
    return this._cities;
  }
  /*** Sets offices */
  public set offices(offices: Office[]) {
    if (offices) {
      this._offices = offices;
    }
  }
  public get offices(): Office[] {
    return this._offices;
  }

  /** This is used for subscribing the value of subject add */
  public add$: Observable<Customer>;
  /** This is used for add camelCaseModelName object */
  private add: Subject<Customer>;
  private destroy: Subject<void>;

  /**
   * Cities  of dynamic presentation component
   */
  private _cities: City[];
  /**
   * Offices  of dynamic presentation component
   */
  private _offices: Office[];


  constructor(
    private customerPresentor: CustomerFormPresenter,
    private cdrRef: ChangeDetectorRef) {
    this.destroy = new Subject();
    this.add = new Subject();
    this.add$ = this.add.asObservable();

    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;

    this.customerFormGroup = this.customerPresentor.buildForm();
    this.selectedCity = new Subject();
    this.selectedCity$ = this.selectedCity.asObservable();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.customerPresentor.add$.pipe(takeUntil(this.destroy)).subscribe((customer: Customer) => {
      this.add.next(customer);
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

  /**
   * Changes city
   */
  public changeCity(city: City): void {
    this.selectedCity.next(city.name);
  }

  /**
   * Changes office
   */
  public changeOffice(): void {

  }

  /** When user click on cancel */
  public cancel(): void {
    // do something here
  }


}

