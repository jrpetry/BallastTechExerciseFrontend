import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { ApplicationUser } from './_models/application-user';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser!: ApplicationUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  magazine() {
    this.router.navigate(['/magazine']);
  }

}
