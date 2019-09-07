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
        const component = this.factoryResolver.resolveComponentFactory<CustomerFormPresentationComponent>(CustomerFormPresentationComponent);
        this.componentFactoryRef = container.createComponent<CustomerFormPresentationComponent>(component);
        this.componentFactoryRef.instance.cities = cities;
        this.componentFactoryRef.instance.selectedCity$.subscribe((name: string) => {
            this.selectedCity.next(name);
        });
        this.componentFactoryRef.instance.add$.subscribe((customer: Customer) => {
            this.addCustomer.next(customer);
        })
        // component.
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
        const componentPortal = new ComponentPortal(CustomerListPresentationComponent)
        this.componentPortalRef = portal.attachComponentPortal(componentPortal);
        this.componentPortalRef.instance.customers = this.customers;
        // componentPortal.
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
            // backdropClass: '',
            positionStrategy: new GlobalPositionStrategy().bottom()
        });
        this.overlayRef = this.overlay.create(overlayConfiguration);
        this.componentOverlayRef = this.overlayRef.attach(
            new ComponentPortal(UserInfoPresentationComponent)
        );
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach();
        });
        // this.componentOverlayRef.injector.
    }
}