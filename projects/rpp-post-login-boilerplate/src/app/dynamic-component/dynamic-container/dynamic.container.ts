import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { City, Office, Customer } from '../dynamic.model';
import { DynamicComponentService } from '../dynamic-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dynamic-container',
  templateUrl: './dynamic.container.html'
})
export class DynamicContainerComponent {
  /**
   * City $ of dynamic container component
   */
  public cities$: Observable<City[]>;
  /**
   * Office $ of dynamic container component
   */
  public offices$: Observable<Office[]>;
  /**
   * Get customer$ of dynamic container component
   */
  public customers$: Observable<Customer[]>;
  constructor(
    private service: DynamicComponentService,
    private toaster: ToastrService
  ) {
    // this.customers$ = this.service.getCustomer();
  }
  /**
   * Gets city list
   * @param name 
   */
  public getCities(name: string): void {
    this.cities$ = this.service.getCityList(name);
  }
  /**
   * Gets office list
   * @param name 
   */
  public getOffices(name: string): void {
    this.offices$ = this.service.getOfficeList(name);
  }
  /**
   * Gets customer
   */
  public getCustomer(): void {
    this.customers$ = this.service.getCustomer();
  }
  /**
   * Adds customer
   * @param customer 
   */
  public addCustomer(customer: Customer): void {
    this.service.addCustomer(customer).subscribe(response => {

      this.toaster.success("Data saved successfully.");
      this.customers$ = this.service.getCustomer();
    }, (err) => {
    });
  }
}