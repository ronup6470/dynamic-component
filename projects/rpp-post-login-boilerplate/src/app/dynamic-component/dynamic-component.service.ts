import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params, TableProperty, HttpService } from 'common-libs';
import { UserInfo, City, Office, Customer } from './dynamic.model';

@Injectable()
export class DynamicComponentService {

  /** store base url */
  private baseUrl: string;
  constructor(
    private http: HttpService,
  ) {
    this.baseUrl = 'http://localhost:3000';

  }
  /**
   * Gets details
   * @param name 
   * @returns details 
   */
  public getCityList(name: string): Observable<City[]> {
    let url: string = this.baseUrl + `/${name}`
    return this.http.httpGetRequest<City[]>(url);
  }
  /**
   * Gets office list
   * @param name 
   * @returns office list 
   */
  public getOfficeList(name: string): Observable<Office[]> {
    let url: string = this.baseUrl + `/${name}`;
    return this.http.httpGetRequest<Office[]>(url);
  }

  /** This will save the record into database */
  public addCustomer(customer: Customer): Observable<Customer> {
    const url: string = this.baseUrl + '/customer';
    return this.http.httpPostRequest<Customer>(url, customer, '1.0');
  }


  /**
   * This function checks for the presence or criteria and constructs the query params object accordingly.
   * This function should be inside shared/utils
   * @param tableProperty The model which needs to be mapped to the criteria that is accepted by the API.
   */
  private paramProcess(tableProperty: TableProperty): Params {
    const params: Params = new Params();
    (tableProperty.pageNumber || (tableProperty.pageNumber === 0)) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.sort) ? params.sort = tableProperty.order + '' + tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';

    return params;
  }
}
