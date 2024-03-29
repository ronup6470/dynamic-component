/**
 * @author Hem Chudgar.
 * @description Customer Card list container.
 */
import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// --------------------------------------- //
import { CustomerList } from '../customer.model';
import { TableProperty } from 'common-libs';
import { CustomerService } from '../customer.service';

/** Component */
@Component({
  selector: 'app-customer-list-card-container',
  templateUrl: './customer-list-card-container.component.html',
  styleUrls: ['./customer-list-card-container.component.scss'],
  host: {
    class: 'aside-list'
  }
})
export class CustomerListCardContainerComponent implements OnDestroy {

  /** This is a observable which passes the list of customer to its child component */
  public customers$: Observable<CustomerList[]> = this.customerService.getCustomerList(new TableProperty());

  /** Initialize subscription */
  private reInitializeSubscription: Subscription

  constructor(
    private customerService: CustomerService,
  ) {
    this.reInitializeSubscription = this.customerService.getInitializeList().subscribe((isReinitialize: boolean) => {
      if (isReinitialize) {
        this.customers$ = this.customerService.getCustomerList(new TableProperty());
      }
    });
  }

  /** This Method is used to get data from server  */
  public getCustomers(tableProperty: TableProperty): void {
    this.customers$ = this.customerService.getCustomerList(tableProperty);
  }

  /** This Method is invoke when user delete data from server  */
  public deleteCustomer(customer: CustomerList): void {
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customerService.setIsDeleted(true);
    });
  }

  public ngOnDestroy(): void {
    this.reInitializeSubscription.unsubscribe();
  }
}
