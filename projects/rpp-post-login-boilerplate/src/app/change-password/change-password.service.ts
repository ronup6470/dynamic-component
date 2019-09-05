/**
 * @author Ronak Patel.
 * @description Service layer class to communicate with the server.
 */
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params, TableProperty, HttpService } from 'common-libs';
import { ChangePasswordAdapter } from './change-password-adapter/change-password-adapter';
import { ChangePassword, } from './change-password.model';

@Injectable()
export class ChangePasswordService {
  /** store base url */
  private baseUrl: string;

  constructor(
    private http: HttpService,
    private changePasswordAdapter: ChangePasswordAdapter,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - changePassword[]
   */
  public getChangePasswords(tableProperty: TableProperty<any>): Observable<ChangePassword[]> {
    const url = this.baseUrl + 'ChangePassword';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<ChangePassword[]>(
      url, '1.0', { params: { ...params } }).pipe(map((data: ChangePassword[]) => {
        return data.map((items) => this.changePasswordAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getChangePasswordById(id: string): Observable<ChangePassword> {
    const url = this.baseUrl + 'ChangePassword/' + id;
    return this.http.httpGetRequest<ChangePassword>(url, '1.0').pipe(map((response: ChangePassword) =>
      this.changePasswordAdapter.toResponse(response)));;

  }

  /** This will save the record into database */
  public addChangePassword(changePassword: ChangePassword): Observable<ChangePassword> {
    const url = this.baseUrl + 'ChangePassword';
    const vall = this.changePasswordAdapter.toRequest(changePassword);
    return this.http.httpPostRequest<ChangePassword>(url, vall, '1.0');
  }

  /** This will save the record by id into database */
  public updateChangePassword(id: string, changePassword: ChangePassword): Observable<ChangePassword> {
    const url = this.baseUrl + 'account/updatepassword/' + id;
    return this.http.httpPutRequest<ChangePassword>(url, changePassword, '1.0');
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteChangePassword(changePassword: ChangePassword): Observable<ChangePassword> {
    const url = this.baseUrl + 'ChangePassword';
    let options = {
      headers: new HttpHeaders(),
      body: changePassword
    };
    return this.http.httpDeleteRequest<ChangePassword>(url, '1.0', options);
  }

  private paramProcess(tableProperty: TableProperty<any>): Params {
    const params = new Params();
    (tableProperty.pageNumber) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.order) ? params.order = tableProperty.order : '';
    (tableProperty.sort) ? params.sort = tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    return (tableProperty.filter) ? tableProperty.filter : params;
  }
}
