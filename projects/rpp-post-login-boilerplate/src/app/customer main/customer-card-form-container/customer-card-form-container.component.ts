/**
 * @author Hem Chudgar.
 * @description Card form container component.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
//---------------------------------------------------------------------//
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

/** Component */
@Component({
  selector: 'app-customer-card-form-container',
  templateUrl: './customer-card-form-container.component.html',
  styleUrls: ['./customer-card-form-container.component.scss'],
  host: {
    class: 'flex-grow-1 h-100'
  }
})
export class CustomerCardFormContainerComponent {
  /** This is a observable which passes the Customer object to its child component */
  public customer$: Observable<Customer> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.customerService.getCustomerById(params.get('id'))),
  );

  constructor(
    private toasterService: ToastrService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
  ) { }

  /** When presentation layer emits the save event, then this will post data on server */
  public addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe(() => 
    {
      this.toasterService.success('Data saved successfully.');
      this.customerService.initializeList();
    },
      (err) => { });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateCustomer(customer: Customer): void {
    const id: string = this.route.snapshot.params.id;
    this.customerService.updateCustomer(id, customer).subscribe(() => {
      this.toasterService.success('Data saved successfully.');
      console.log(id);
      customer.id = +id;
      this.customerService.setCustomer(customer);
    }, (err) => { });
  }


}
