import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MagazineService } from '../_services/magazine.service';
import { AlertService, AuthenticationService } from '../_services';
import { Magazine } from '../_models/magazine';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {
  loading = false;
  selectedMagazine!: Magazine;
  magazines: Magazine[] = [];
  returnUrl!: string;
  userName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private magazineService: MagazineService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAllMagazine();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSelect(magazine: Magazine): void {
    this.selectedMagazine = magazine;
  }

  private loadAllMagazine() {
    const currentApplicationUser = this.authenticationService.currentUserValue;
    this.userName = currentApplicationUser.userName;
    this.magazineService.getAll(currentApplicationUser.id).pipe(first()).subscribe(magazines => {
      this.magazines = magazines;
    });
  }

  Update(magazine: Magazine) {
    this.magazineService.put(magazine)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/magazine']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  Delete(id: number) {
    this.magazineService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/magazine']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  Create() {
    this.router.navigate(['/magazine-create']);
  }
}
