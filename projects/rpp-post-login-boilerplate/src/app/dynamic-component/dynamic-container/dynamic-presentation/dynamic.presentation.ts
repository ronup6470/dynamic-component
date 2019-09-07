import { Component, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, ViewChild, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
// ---------------------------------- //
import { DynamicPresenter } from '../dynamic-presenter/dynamic.presenter';
import { City, Office, Customer } from './../../dynamic.model';


@Component({
  selector: 'app-dynamic-ui',
  templateUrl: './dynamic.presentation.html',
  styleUrls: ['./dynamic.presentation.scss'],
  viewProviders: [DynamicPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPresentationComponent implements OnInit {
  /*** Sets cities */
  @Input() public set cities(cities: City[]) {
    if (cities) {
      this._cities = cities;
      this.presenter.createFactoryResolver(this.container, this.cities);
    }
  }
  public get cities(): City[] {
    return this._cities;
  }
  /*** Sets offices */
  @Input() public set offices(offices: Office[]) {
    if (offices) {
      this._offices = offices;
      this.presenter.setOffices(this.offices);
    }
  }
  public get offices(): Office[] {
    return this._offices;
  }
  @Input() public set customers(customers: Customer[]) {
    if (customers) {
      this._customers = customers;
      this.presenter.createPortal(this.portal);
      this.presenter.setCustomers(this.customers);
    }
  }
  public get customers(): Customer[] {
    return this._customers;
  }
  /*** Output of dynamic presentation component */
  @Output() public getCities: EventEmitter<string>;

  /*** Output  of dynamic presentation component */
  @Output() public getOffices: EventEmitter<string>;

  /*** Output  of dynamic presentation component */
  @Output() public add: EventEmitter<Customer>;

  /*** View child of dynamic presentation component */
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  /*** View child of dynamic presentation component */
  @ViewChild(CdkPortalOutlet) public portal: CdkPortalOutlet;

  /*** Cities  of dynamic presentation component */
  private _cities: City[];

  /*** Offices  of dynamic presentation component */
  private _offices: Office[];
  private _customers: Customer[];

  constructor(
    private presenter: DynamicPresenter,
    private factoryResolver: ComponentFactoryResolver
  ) {
    this.getCities = new EventEmitter();
    this.getOffices = new EventEmitter();
    this.add = new EventEmitter();
  }

  public ngOnInit(): void {
    this.presenter.selectedCity$.subscribe((name: string) => {
      this.getOffices.emit(name);
    });
    this.presenter.addCustomer$.subscribe((customer: Customer) => {
      this.add.emit(customer);
    });
  }

  /**
   * Creates factory resolver
   */
  public createFactoryResolver(): void {
    this.getCities.emit('city');
  }

  /**
   * Creates portal
   */
  public createPortal(): void {
    this.presenter.createPortal(this.portal);
  }

  /**
   * Creates overlay
   */
  public createOverlay(): void {
    this.presenter.createOverlay();
  }
}