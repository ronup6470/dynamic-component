/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */
import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';
import { Customer, CustomerList } from '../customer.model';
@Injectable()
export class CustomerListAdapter implements Adapter<CustomerList> {
    /** This method is used to transform response object into T object. */
    public toResponse(item: CustomerList): CustomerList {
        const customerList: CustomerList = new CustomerList(
            item.id,
            item.firstName,
            item.company,
            item.group,
        );
        return customerList;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: CustomerList): CustomerList {
        const customerList: CustomerList = new CustomerList(
            item.id,
            item.firstName,
            item.company,
            item.group,
        );
        return customerList;
    }
}
@Injectable()
export class CustomerAdapter implements Adapter<Customer> {

    /** This method is used to transform response object into T object. */
    public toResponse(item: Customer): Customer {
        const customer: Customer = new Customer(
            new Date(item.createdAt),
            item.email,
            item.productNo,
            item.image,
            item.id,
            item.firstName,
            item.company,
            item.group,
        );
        return customer;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: Customer): Customer {
        const customer: Customer = new Customer(
            item.createdAt,
            item.email,
            item.productNo,
            item.image,
            item.id,
            item.firstName,
            item.company,
            item.group,
        );
        return customer;
    }
}

