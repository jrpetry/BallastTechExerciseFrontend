import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { ApplicationUserService } from '../_services/applicationUser.service';
import { ApplicationUser } from '../_models';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  applicationUser:any;
;

  roles = [
    { id: 1, name: "Teacher" },
    { id: 2, name: "Student" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: ApplicationUserService,
    private alertService: AlertService)
  {
    // redirect to home if already logged in
    //if (this.authenticationService.currentUserValue) {
    //  this.router.navigate(['/']);
    //}
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.applicationUser = {
      id: -1,
      userName: this.registerForm.value.username,
      pwd: this.registerForm.value.password,
      role: this.roles[this.registerForm.value.role - 1].name
    }

    this.loading = true;
    this.userService.post(this.applicationUser)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
