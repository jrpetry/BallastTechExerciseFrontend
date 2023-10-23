import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, MagazineService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'magazine-create.component.html' })
export class MagazineCreateComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  magazine: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private magazineService: MagazineService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    // redirect to home if already logged in
    //if (this.authenticationService.currentUserValue) {
    //  this.router.navigate(['/']);
    //}
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      releaseDate: ['01/01/1753', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const currentApplicationUserId = this.authenticationService.currentUserValue.id;

    this.magazine = {
      id: -1,
      name: this.registerForm.value.name,
      releaseDate: new Date(this.registerForm.value.releaseDate),
      applicationUserId: currentApplicationUserId
    };

    this.loading = true;
    this.magazineService.post(this.magazine)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/magazine']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
