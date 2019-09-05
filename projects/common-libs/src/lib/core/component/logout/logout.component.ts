import { Component, OnInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private oidcFacade: OidcFacade) { }

  ngOnInit() {
    this.oidcFacade.signoutRedirect();
  }

}
