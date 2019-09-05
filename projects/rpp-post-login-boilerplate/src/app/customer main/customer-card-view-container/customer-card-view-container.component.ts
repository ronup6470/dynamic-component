/**
 * @author Hem Chudgar.
 * @description Card view container component.
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
// ---------------------------------------------- //
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

/** Component */
@Component({
  selector: 'app-customer-card-view-container',
  templateUrl: './customer-card-view-container.component.html',
  styleUrls: ['./customer-card-view-container.component.scss'],
  host: {
    class: 'flex-grow-1 h-100'
  }
})
export class CustomerCardViewContainerComponent {
  /** This is a observable which passes the Customer object to its child component */
  public customer$: Observable<Customer> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.customerService.getCustomerById(params.get('id'))),
  );

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

}
