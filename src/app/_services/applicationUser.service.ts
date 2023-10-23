import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApplicationUser } from '../_models';
import { AppConstants } from '../appConstants';

@Injectable({ providedIn: 'root' })
export class ApplicationUserService {
  uri = AppConstants.API_URI + '/ApplicationUser/';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ApplicationUser[]>(this.uri + 'Get');
  }

  get(id: number) {
    return this.http.get<ApplicationUser>(this.uri + 'Get/' + id.toString());
  }

  post(applicationUser: ApplicationUser) {
    return this.http.post(this.uri + 'Post', applicationUser);
  }

  put(applicationUser: ApplicationUser) {
    return this.http.put(this.uri + 'Put/' + applicationUser.id.toString(), applicationUser);
  }

  delete(id: number) {
    return this.http.delete(this.uri + 'Delete/' + id.toString());
  }
}
