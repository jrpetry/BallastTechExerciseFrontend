import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationUser} from '../_models';
import { AppConstants } from '../appConstants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  public currentUser: Observable<ApplicationUser>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(AppConstants.API_URI + '/authenticate/login', { userName: username, pwd: password, role: '', id: -1 })
      .pipe(map(user => {
        // login successful!
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(null!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
}
