import { Subject, Observable } from 'rxjs';
import { Overlay, OverlayRef, OverlayConfig, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { UserInfoPresentationComponent } from '../dynamic-presentation/user-info-presentation/user-info.presentation';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { UserInfo, City, Office, Customer } from '../../dynamic.model';
import { CustomerFormPresentationComponent } from '../dynamic-presentation/customer-form-presentation/customer-form.presentation';

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
    // private componentRef: ComponentRef<CustomerFormPresentationComponent>;
    private componentRef: ComponentRef<any>;
    /**
     * Overlay ref of dynamic presenter
     */
    private overlayRef: OverlayRef;
    private selectedCity: Subject<string>;
    private addCustomer: Subject<Customer>;
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
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.componentRef = container.createComponent<CustomerFormPresentationComponent>(
            this.factoryResolver.resolveComponentFactory<CustomerFormPresentationComponent>(CustomerFormPresentationComponent)
        );
        this.componentRef.instance.cities = cities;
        this.componentRef.instance.selectedCity$.subscribe((name: string) => {
            this.selectedCity.next(name);
        });
        this.componentRef.instance.add$.subscribe((customer: Customer) => {
            this.addCustomer.next(customer);
        })
    }

    /**
     * Sets offices
     * @param offices 
     */
    public setOffices(offices: Office[]): void {
        this.componentRef.instance.offices = offices;
    }
    /**
     * Creates portal
     */
    public createPortal(portal: CdkPortalOutlet): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.componentRef = portal.attachComponentPortal(
            new ComponentPortal(UserInfoPresentationComponent)
        );
        let user: UserInfo = new UserInfo();
        user.name = 'ronak';
        user.city = 'valsad';
        user.address = 'jujwa';
        user.number = 1;
        this.componentRef.instance.userInfo = user;
        setTimeout(() => {
            let user1: UserInfo = new UserInfo();
            user1.name = 'ronak323';
            user1.city = 'valsad2332';
            user1.address = 'jujwa232';
            user1.number = 1222;
            this.componentRef.instance.userInfo = user1;
        }, 1000);
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
        this.componentRef = this.overlayRef.attach(
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
        this.componentRef.instance.userInfo = user;
        this.componentRef
    }
}