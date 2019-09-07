import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// ---------------------------------- //
import { CustomerListPresenter } from '../customer-list-presenter/customer-list.presenter';
import { Customer } from '../../../dynamic.model';


@Component({
  selector: 'app-customer-list-ui',
  templateUrl: './customer-list.presentation.html',
  styleUrls: ['./customer-list.presentation.scss'],
  viewProviders: [CustomerListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListPresentationComponent {
  /** This property is used to store the customers that has been retrieved from the API. */
  public set customers(value: Customer[]) {
    if(value){
      this._customers = value;
      this.changeDetection.detectChanges();
    }
  };

  public get customers(): Customer[] {
    return this._customers;
  }
  private _customers: Customer[];
  constructor(private changeDetection: ChangeDetectorRef) { }
}