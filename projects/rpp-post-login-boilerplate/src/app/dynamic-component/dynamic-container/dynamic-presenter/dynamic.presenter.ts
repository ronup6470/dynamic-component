import { Subject, Observable } from 'rxjs';
import { Overlay, OverlayRef, OverlayConfig, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { UserInfoPresentationComponent } from '../dynamic-presentation/user-info-presentation/user-info.presentation';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { UserInfo, City, Office, Customer } from '../../dynamic.model';
import { CustomerFormPresentationComponent } from '../dynamic-presentation/customer-form-presentation/customer-form.presentation';
import { CustomerListPresentationComponent } from '../dynamic-presentation/customer-list-presentation/customer-list.presentation';

/**
 * Injectable
 */
@Injectable()
export class DynamicPresenter {
    public selectedCity$: Observable<string>;
    public addCustomer$: Observable<Customer>;
    /**
     * Component ref of dynamic presenter
     */
    private componentFactoryRef: ComponentRef<CustomerFormPresentationComponent>;
    /**
     * Component portal ref of dynamic presenter
     */
    private componentPortalRef: ComponentRef<CustomerListPresentationComponent>;
    /**
     * Component overlay ref of dynamic presenter
     */
    private componentOverlayRef: ComponentRef<any>;
    /**
     * Overlay ref of dynamic presenter
     */
    private overlayRef: OverlayRef;
    private selectedCity: Subject<string>;
    private addCustomer: Subject<Customer>;
    public customers: Customer[];
    constructor(
        private factoryResolver: ComponentFactoryResolver,
        private overlay: Overlay
    ) {
        this.selectedCity = new Subject();
        this.addCustomer = new Subject();
        this.selectedCity$ = this.selectedCity.asObservable();
        this.addCustomer$ = this.addCustomer.asObservable();
    }
    /**
     * Creates factory resolver
     */
    public createFactoryResolver(container: ViewContainerRef, cities: City[]): void {
        if (this.componentFactoryRef) {
            this.componentFactoryRef.destroy();
        }
        this.componentFactoryRef = container.createComponent<CustomerFormPresentationComponent>(
            this.factoryResolver.resolveComponentFactory<CustomerFormPresentationComponent>(CustomerFormPresentationComponent)
        );
        this.componentFactoryRef.instance.cities = cities;
        this.componentFactoryRef.instance.selectedCity$.subscribe((name: string) => {
            this.selectedCity.next(name);
        });
        this.componentFactoryRef.instance.add$.subscribe((customer: Customer) => {
            this.addCustomer.next(customer);
        })
    }

    /**
     * Sets offices
     * @param offices 
     */
    public setOffices(offices: Office[]): void {
        this.componentFactoryRef.instance.offices = offices;
    }

    /**
     * Creates portal
     */
    public createPortal(portal: CdkPortalOutlet): void {
        if (this.componentPortalRef) {
            this.componentPortalRef.destroy();
        }
        this.componentPortalRef = portal.attachComponentPortal(
            new ComponentPortal(CustomerListPresentationComponent)
        );
        this.componentPortalRef.instance.customers = this.customers;

    }
    /**
     * Sets customer
     * @param customer 
     */
    public setCustomers(customer: Customer[]): void {
        this.componentPortalRef.instance.customers = customer;
        this.customers = customer;
    }
    /**
     * Creates overlay
     */
    public createOverlay(): void {
        const overlayConfiguration: OverlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: '',
            positionStrategy: new GlobalPositionStrategy().centerVertically().centerHorizontally()
        });
        this.overlayRef = this.overlay.create(overlayConfiguration);
        this.componentOverlayRef = this.overlayRef.attach(
            new ComponentPortal(UserInfoPresentationComponent)
        );
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach();
        });
        let user: UserInfo = new UserInfo();
        user.name = 'ronak';
        user.city = 'valsad';
        user.address = 'jujwa';
        user.number = 1;
        this.componentOverlayRef.instance.userInfo = user;
        this.componentOverlayRef
    }
}