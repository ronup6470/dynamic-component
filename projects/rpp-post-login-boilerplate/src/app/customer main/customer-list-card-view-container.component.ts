/**
 * @author Hem Chudgar.
 * @description Customer Card list view container.
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

/** Component */
@Component({
  selector: 'app-customer-list-card-view-container',
  templateUrl: './customer-list-card-view-container.component.html',
  styleUrls: ['./customer-list-card-view-container.component.scss'],
  host: {
    class: 'h-100 d-flex position-relative'
  }
})
export class CustomerListCardViewContainerComponent implements OnInit {

  /** Element ref of the div */
  @ViewChild('view') public elementRef: ElementRef;

  constructor() { }

  /** ngOnInit */
  public ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('d-flex');
  }

}
