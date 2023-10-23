import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApplicationUser } from '../_models';
import { AlertService, ApplicationUserService, AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser!: ApplicationUser;
  currentUserSubscription: Subscription;
  applicationUsers: ApplicationUser[] = [];
  isTeacher = false;
  loading = false;
  selectedApplicationUser!: ApplicationUser;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private applicationUserService: ApplicationUserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loadAllUsers();
    this.isTeacher = this.currentUser.role == 'teacher';
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  get f() { return this.form.controls; }

  onSelect(applicationUser: ApplicationUser): void {
    this.selectedApplicationUser = applicationUser;
  }

  private loadAllUsers() {
    this.applicationUserService.getAll().pipe(first()).subscribe(applicationUsers => {
      this.applicationUsers = applicationUsers;
    });
  }

  Update(applicationUser: ApplicationUser) {
    this.applicationUserService.put(applicationUser)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  Delete(id: number) {
    this.applicationUserService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  Create() {
    this.router.navigate(['/register']);
  }
}
